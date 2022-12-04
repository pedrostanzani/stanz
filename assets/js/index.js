const jobSearchFilter = () => {
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
      const filteredItems = listItems.filter(item => {
        return item.query.includes(query);
      })
      unorderedList.replaceChildren(...filteredItems.map(i => i.item));
    })
  }
}

const updateJobsDisplay = (filterTags, jobs) => {
  const unorderedList = document.querySelector('#job-listings');

  if (filterTags.length === 0) {
    unorderedList.replaceChildren(...jobs);
    return;
  }

  const jobMatches = Array.from(jobs).filter(job => {
    const tags = job.getAttribute('data-tags');
    for (let i = 0; i < filterTags.length; i++) {
      const tag = filterTags[i];
      if (tags.includes(tag)) { return true; }
    }
    return false;
  });

  if (jobMatches.length === 0) {
    const NotFound = document.createElement('li');
    const pTag = document.createElement('p');
    pTag.textContent = 'Nenhuma vaga satisfaz os filtros inseridos!';
    NotFound.appendChild(pTag);
    NotFound.classList.add('mt-1');
    unorderedList.replaceChildren(NotFound);
    return;
  }
  unorderedList.replaceChildren(...jobMatches);
}

const activeFilterButtons = () => {
  const jobListings = document.querySelectorAll('.jobs--job-card');
  const buttons = document.querySelectorAll('.filter-badge');

  let filterJobsByTags = [];

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const isActive = Array
        .from(button.classList)
        .includes('filter-badge-active');

      if (isActive) {
        button.classList.remove('filter-badge-active');
        filterJobsByTags = filterJobsByTags.filter(n => n !== button.getAttribute('data-tag'));
      } else {
        button.classList.add('filter-badge-active');
        filterJobsByTags.push(button.getAttribute('data-tag'));
      }

      updateJobsDisplay(filterJobsByTags, jobListings);
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

const handleEditFormSubmission = () => {
  const submitButton = document.querySelector('#form-submit');
  if (!submitButton) { return ; }

  submitButton.addEventListener('click', () => {

    const university = document.querySelector('#form-select-univeristy').value;
    const LinkedIn = document.querySelector('#edit-form--linkedin').value;

    window.localStorage.setItem('university', university);
    window.localStorage.setItem('linkedin', LinkedIn);

    window.location.href = '/pages/perfil.html';
  })
}

const loadProfileData = () => {
  const universityName = document.querySelector('#profile--university-name');
  const linkedinAnchor = document.querySelector('#profile--linkedin-link');

  if (!universityName || !linkedinAnchor) return;

  // Set university name
  const storageName = window.localStorage.getItem('university');
  const universities = [
    { code: 'insper', name: 'Insper Instituto de Ensino e Pesquisa'},
    { code: 'fgv', name: 'Fundação Getúlio Vargas' },
    { code: 'usp', name: 'Universidade de São Paulo' },
    { code: 'mack', name: 'Mackenzie' }
  ];

  const filteredUniversities = universities.filter(university => {
    return university.code === storageName;
  });

  if (filteredUniversities.length === 1) {
    universityName.textContent = filteredUniversities[0].name;
  }

  // Set Linkedin link
  const storageLinkedIn = window.localStorage.getItem('linkedin');
  if (storageLinkedIn) {
    linkedinAnchor.setAttribute('href', 'https://linkedin.com/in/' + storageLinkedIn)
  }

}

// Main script execution
addEventListener('DOMContentLoaded', () => {
  jobSearchFilter();
  activeFilterButtons();
  goBack();
  handleEditFormSubmission();
  loadProfileData();
})