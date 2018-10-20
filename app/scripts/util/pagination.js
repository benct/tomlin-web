function createListOfPreviousPages(totalPages, currentPage) {
    const minPageNr = Math.min(currentPage - 3, totalPages - 5);
    const firstPage = Math.max(minPageNr, 1);
    const previousPages = [];
    for (let i = firstPage; i < currentPage; i++) {
        previousPages.push(i);
    }
    return previousPages;
}

function createListOfConsecutivePages(totalPages, firstPage, currentPage) {
    const lastPage = Math.min(totalPages, firstPage + 6);
    const consecutivePages = [];
    for (let i = currentPage + 1; i <= lastPage; i++) {
        consecutivePages.push(i);
    }
    return consecutivePages;
}

export default function pagination(totalPages, currentPage) {
    const previousPages = createListOfPreviousPages(totalPages, currentPage);
    const consecutivePages = createListOfConsecutivePages(totalPages, previousPages[0] || 1, currentPage);

    return {
        enabled: totalPages > 1,
        first: currentPage > 2,
        previousPages,
        previous: currentPage - 1,
        current: currentPage,
        next: currentPage + 1,
        consecutivePages,
        last: currentPage < totalPages - 1,
        total: totalPages,
    };
}
