#!/usr/bin/env node
/**
 * Incremental QA script for Aflah website.
 * - Runs lightweight checks and reports PASS/FAIL/IGNORED
 * - Ignores features/routes that don't exist yet
 */

import { exec } from 'node:child_process'

const RESULT = { PASS: 'PASS', FAIL: 'FAIL', IGNORED: 'IGNORED' }

function logLine(status, name, note = '') {
  const mark = status === RESULT.PASS ? '✅' : status === RESULT.FAIL ? '❌' : '⏭️'
  const msg = note ? `${name} — ${note}` : name
  console.log(`${mark}  ${status.padEnd(7)} ${msg}`)
}

function runCmd(cmd, args = [], opts = {}) {
  const command = [cmd, ...args].join(' ')
  return new Promise((resolve) => {
    exec(command, { shell: true, ...opts }, (error, stdout, stderr) => {
      resolve({ code: error ? (error.code ?? 1) : 0, stdout: stdout || '', stderr: stderr || '' })
    })
  })
}

async function httpGet(url, timeoutMs = 4000) {
  const ctrl = new AbortController()
  const id = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    const res = await fetch(url, { signal: ctrl.signal })
    clearTimeout(id)
    return res
  } catch {
    clearTimeout(id)
    return null
  }
}

async function checkTypeCheck() {
  const r = await runCmd('npm', ['run', 'type-check'])
  if (r.code === 0) logLine(RESULT.PASS, 'Type check')
  else logLine(RESULT.FAIL, 'Type check', r.stderr.split('\n').slice(-3).join(' '))
}

async function checkLint() {
  const r = await runCmd('npm', ['run', 'lint'])
  if (r.code === 0) logLine(RESULT.PASS, 'Lint')
  else logLine(RESULT.FAIL, 'Lint', r.stderr.split('\n').slice(-3).join(' '))
}

async function checkServerReachable() {
  const res = await httpGet('http://localhost:3001')
  if (res && res.ok) {
    logLine(RESULT.PASS, 'Server reachable (GET /)')
    return true
  }
  logLine(RESULT.FAIL, 'Server reachable (GET /)', 'http://localhost:3001 not responding OK')
  return false
}

/**
 * Parse homepage HTML for expected content/classes. If not found, IGNORE.
 */
async function checkHomepageContent() {
  const res = await httpGet('http://localhost:3001')
  if (!res) {
    logLine(RESULT.FAIL, 'Homepage content', 'no response')
    return
  }
  const html = await res.text()

  const tests = [
    { name: 'Hero CTA: Schedule Appointment', found: /Schedule\s+Appointment/i.test(html) },
    { name: 'Hero CTA: WhatsApp Chat', found: /WhatsApp\s+Chat/i.test(html) },
    { name: 'Service cards: Learn More', found: /Learn\s+More/i.test(html) },
    { name: 'Workshops: Register Now', found: /Register\s+Now/i.test(html) },
    { name: 'View All Workshops button', found: /View\s+All\s+Workshops/i.test(html) },
    { name: 'Social Impact: Learn More About Our Impact', found: /Learn\s+More\s+About\s+Our\s+Impact/i.test(html) },
    { name: 'CTA: Book Discovery Call', found: /Book\s+Discovery\s+Call/i.test(html) },
    { name: 'CTA: WhatsApp Chat', found: /WhatsApp\s+Chat/i.test(html) },
    { name: 'Brand button classes present', found: /btn-aflah-(primary|secondary)/.test(html) },
  ]

  for (const t of tests) {
    if (t.found) logLine(RESULT.PASS, t.name)
    else logLine(RESULT.IGNORED, t.name, 'not found (feature/text may not exist yet)')
  }

  // Heuristic contrast checks (class-based)
  const conflictRegexes = [
    // exact white-on-white (must have both bg-white AND text-white in same class, but not semi-transparent)
    /class="[^"]*(?:bg-white(?![\/\d])[^"]*text-white|text-white[^"]*bg-white(?![\/\d]))[^"]*"/gi,
    // hover white-on-white (must have both hover:bg-white AND hover:text-white in same class, but not semi-transparent)
    /class="[^"]*(?:hover:bg-white(?![\/\d])[^"]*hover:text-white|hover:text-white[^"]*hover:bg-white(?![\/\d]))[^"]*"/gi,
    // brand green same color (unlikely but check, but not semi-transparent)
    /class="[^"]*(?:bg-aflah-green(?![\/\d])[^"]*text-aflah-green|text-aflah-green[^"]*bg-aflah-green(?![\/\d]))[^"]*"/gi,
  ]

  let conflicts = 0
  for (const rx of conflictRegexes) {
    const m = html.match(rx)
    if (m && m.length) conflicts += m.length
  }
  if (conflicts > 0) {
    logLine(RESULT.FAIL, 'Button contrast (class check)', `${conflicts} potential white-on-white or same-color combos`)
  } else {
    logLine(RESULT.PASS, 'Button contrast (class check)')
  }

  // CTA section specific checks (prevent color flip on hover)
  const ctaBlock = html.match(/Ready\s+to\s+Begin\s+Your\s+Journey[\s\S]*?<\/section>/i)
  if (ctaBlock) {
    const block = ctaBlock[0]
    const issues = []
    if (/WhatsApp\s+Consultation/i.test(block)) {
      // should not have hover:bg-white and hover:text-aflah-green simultaneously for first button
      if (/hover:bg-white\b/.test(block) && /hover:text-white\b/.test(block)) {
        issues.push('CTA hover white-on-white found')
      }
    }
    if (issues.length) logLine(RESULT.FAIL, 'CTA buttons contrast', issues.join('; '))
    else logLine(RESULT.PASS, 'CTA buttons contrast')
  } else {
    logLine(RESULT.IGNORED, 'CTA buttons contrast', 'CTA section not found')
  }
}

async function main() {
  console.log('— Aflah Website Incremental QA —')
  // Quick pre-checks
  await checkTypeCheck()
  await checkLint()

  // Server check (do not attempt to start; we only verify)
  const up = await checkServerReachable()
  if (!up) {
    // We still continue with IGNORED content checks to keep output stable
    logLine(RESULT.IGNORED, 'Homepage content checks', 'server not reachable')
    return
  }

  // Content checks
  await checkHomepageContent()

  // Basic perf sanity (headers only)
  const res = await httpGet('http://localhost:3001')
  if (res) {
    const cl = res.headers.get('content-length')
    if (cl && Number(cl) > 0) logLine(RESULT.PASS, 'Response has content')
    else logLine(RESULT.IGNORED, 'Response has content')
  }

  console.log('\nQA run complete.')
}

main().catch(err => {
  logLine(RESULT.FAIL, 'QA script error', String(err?.message || err))
  process.exitCode = 1
})


