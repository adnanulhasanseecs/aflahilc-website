"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const TEST_EVENTS = [
  { id: 1, title: "Event 1" },
  { id: 2, title: "Event 2" },
  { id: 3, title: "Event 3" },
  { id: 4, title: "Event 4" },
  { id: 5, title: "Event 5" },
  { id: 6, title: "Event 6" },
  { id: 7, title: "Event 7" },
  { id: 8, title: "Event 8" },
  { id: 9, title: "Event 9" },
];

const EVENTS_PER_PAGE = 3;

export default function TestPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(TEST_EVENTS.length / EVENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
  const endIndex = startIndex + EVENTS_PER_PAGE;
  const currentEvents = TEST_EVENTS.slice(startIndex, endIndex);

  console.log('Test Debug:', {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    eventsLength: TEST_EVENTS.length,
    currentEventsLength: currentEvents.length,
    currentEvents: currentEvents.map(e => e.title)
  });

  const handlePageChange = (page: number) => {
    console.log('Test - Changing to page:', page);
    setCurrentPage(page);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Pagination</h1>
      
      <div className="mb-4">
        <p>Current Page: {currentPage}</p>
        <p>Total Pages: {totalPages}</p>
        <p>Events Per Page: {EVENTS_PER_PAGE}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Current Events:</h2>
        {currentEvents.map(event => (
          <div key={event.id} className="p-2 bg-gray-100 mb-2">
            {event.title}
          </div>
        ))}
      </div>

      <div className="flex space-x-2 mb-4">
        <Button 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            className={page === currentPage ? "bg-blue-500 text-white" : ""}
          >
            {page}
          </Button>
        ))}
        
        <Button 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
