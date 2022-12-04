const main = () => {
  const searchInput = document.querySelector('#job-search-input');
  const unorderedList = document.querySelector('#job-listings');

  if (searchInput && unorderedList) {
    const listItems = Array.from(unorderedList.querySelectorAll('li')).map(item => {
      const jobTitle = item.querySelector('.job-title').innerText;
      const companyName = item.querySelector('.company-name').innerText;
      const query = jobTitle + ' ' + companyName;
  
      return {
        query: query.toLowerCase(),
        item: item
      };
    })
  
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      const filteredItems = listItems.filter(item => item.query.includes(query))
      unorderedList.replaceChildren(...filteredItems.map(i => i.item));
    })
  }
}

const activeFilterButtons = () => {
  const buttons = document.querySelectorAll('.filter-badge');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const isActive = Array
        .from(button.classList)
        .includes('filter-badge-active');

      if (isActive) {
        button.classList.remove('filter-badge-active');
      } else {
        button.classList.add('filter-badge-active');
      }
    })
  })
}

const goBack = () => {
  let closeMenu = document.querySelector('#close-menu');

  if (closeMenu) {
    closeMenu.addEventListener('click', () => {
      history.back();
    })
  }
}

// Main script execution
addEventListener('DOMContentLoaded', () => {
  main();
  activeFilterButtons();
  goBack();
})