const activeFilterButtons = (onFilter) => {
  const buttons = document.querySelectorAll('.filter-badge');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const isActive = Array.from(button.classList).includes('filter-badge-active');
      if (isActive) { button.classList.remove('filter-badge-active'); } 
      else { button.classList.add('filter-badge-active');}

      onFilter();
    })
  })
}

const jobSearchFilter = (onFilter) => {
  const searchInput = document.querySelector('#job-search-input');

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      onFilter();
    })
  }
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

  const biography = document.querySelector('#edit-form--biography');
  const university = document.querySelector('#form-select-univeristy');
  const LinkedIn = document.querySelector('#edit-form--linkedin');

  // Pre-load with set variables
  // const storageName = window.localStorage.getItem('university');
  const storageLinkedIn = window.localStorage.getItem('linkedin');
  const storageBio = window.localStorage.getItem('biography');

  if (storageLinkedIn) { LinkedIn.value = storageLinkedIn }
  else { LinkedIn.value = 'pedrostanzani' }

  if (storageBio) { biography.value = storageBio }
  else { biography.value = "Sou estudante de Engenharia da Computação, atualmente no segundo período da faculdade. Sei programar em Python e Haskell e busco uma oportunidade de estágio no mercado financeiro." }

  submitButton.addEventListener('click', () => {

    window.localStorage.setItem('biography', biography.value);
    window.localStorage.setItem('university', university.value);
    window.localStorage.setItem('linkedin', LinkedIn.value);

    window.location.href = 'perfil.html';
  })
}

const loadProfileData = () => {
  const bioParagraph   = document.querySelector('#profile--biography');
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

  // Set biography paragraph
  const storageBio = window.localStorage.getItem('biography');
  if (storageBio) {
    bioParagraph.textContent = storageBio;
  }

}

const sendJobApplication = () => {
  const applicationButton = document.querySelector('#applicationButton');

  if (!applicationButton) { return; }

  applicationButton.addEventListener('click', () => {
    applicationButton.classList.add('sent');
    applicationButton.innerHTML = `
        <span>Currículo enviado!</span>
        <img src="./../../assets/img/icons/whiteCheck.svg" alt="Checkmark icon.">
    `
  })
}

// Main script execution
addEventListener('DOMContentLoaded', () => {
  const unorderedList = document.querySelector('#job-listings');
  let listItems;

  if (unorderedList) {
    listItems = Array.from(unorderedList.querySelectorAll('li')).map(item => {
      const jobTitle = item.querySelector('.job-title').innerText;
      const companyName = item.querySelector('.company-name').innerText;
      const query = jobTitle + ' ' + companyName;
  
      const dataTags = item.getAttribute('data-tags');
  
      return {
        query: query.toLowerCase(),
        tags: dataTags,
        item: item
      };
    });
  }

  const handleApplyFilter = () => {
    const searchInput = document.querySelector('#job-search-input');
    const buttons = document.querySelectorAll('.filter-badge');
    const selectedDataTags = Array
      .from(buttons)
      .filter(btn => [...btn.classList].includes('filter-badge-active'))
      .map(btn => btn.getAttribute('data-tag'));

    const filterApplied = listItems.filter(item => {
      const matchesQuery = item.query.includes(searchInput.value.toLowerCase());
      let matchesTags = true;
      if (selectedDataTags.length > 0) {
        matchesTags = false;
        selectedDataTags.forEach(tag => {
          if (item.tags.includes(tag)) {
            matchesTags = true;
          }
        })
      }
      return matchesTags && matchesQuery;
    })

    unorderedList.replaceChildren(...filterApplied.map(i => i.item));
  }

  jobSearchFilter(handleApplyFilter);
  activeFilterButtons(handleApplyFilter);
  goBack();
  handleEditFormSubmission();
  loadProfileData();
  sendJobApplication();
})
