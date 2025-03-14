document.addEventListener('DOMContentLoaded', function () {
  // Dados do line-up (em um caso real, isso poderia vir de uma API)
  const lineup = [
    // SEXTA
    {
      name: "Abertura",
      startTime: "19:00",
      endTime: "20:00",
      genre: "Opening",
      day: "Sexta"
    },
    {
      name: "Noctivagorum",
      startTime: "20:00",
      endTime: "22:00",
      genre: "Psytrance",
      day: "Sexta",
      country: "Brazil"
    },
    {
      name: "Creepy Deep",
      startTime: "22:00",
      endTime: "00:00",
      genre: "Psytrance",
      day: "Sexta",
      country: "Brazil"
    },

    // SÁBADO
    {
      name: "Gesh",
      startTime: "00:00",
      endTime: "02:00",
      genre: "Psytrance",
      day: "Sábado",
      country: "Chile"
    },
    {
      name: "Konebu",
      startTime: "02:00",
      endTime: "04:00",
      genre: "Psytrance",
      day: "Sábado",
      country: "Brazil"
    },
    {
      name: "Khaline",
      startTime: "04:00",
      endTime: "06:00",
      genre: "Psytrance",
      day: "Sábado",
      country: "Brazil"
    },
    {
      name: "Marambá",
      startTime: "06:00",
      endTime: "08:00",
      genre: "Psytrance",
      day: "Sábado",
      country: "Brazil"
    },
    {
      name: "Logic UFO",
      startTime: "08:00",
      endTime: "10:00",
      genre: "Psytrance",
      day: "Sábado",
      country: "Brazil"
    },
    {
      name: "Space Alchemist",
      startTime: "10:00",
      endTime: "12:00",
      genre: "Psytrance",
      day: "Sábado",
      country: "Brazil"
    },
    {
      name: "Kutanimal",
      startTime: "12:00",
      endTime: "14:00",
      genre: "Psytrance",
      day: "Sábado",
      country: "UK"
    },
    {
      name: "Anginha vs Booo",
      startTime: "14:00",
      endTime: "16:00",
      genre: "Psytrance",
      day: "Sábado",
      country: "Brazil"
    },
    {
      name: "Attom",
      startTime: "16:00",
      endTime: "18:00",
      genre: "Psytrance",
      day: "Sábado",
      country: "Brazil"
    },
    {
      name: "Lulio",
      startTime: "18:00",
      endTime: "20:00",
      genre: "Psytrance",
      day: "Sábado",
      country: "Brazil"
    },
    {
      name: "Whrikk",
      startTime: "20:00",
      endTime: "22:00",
      genre: "Psytrance",
      day: "Sábado",
      country: "Netherlands"
    },
    {
      name: "Mubali",
      startTime: "22:00",
      endTime: "00:00",
      genre: "Psytrance",
      day: "Sábado",
      country: "USA"
    },

    // DOMINGO
    {
      name: "Farebi Jalebi",
      startTime: "00:00",
      endTime: "02:00",
      genre: "Psytrance",
      day: "Domingo",
      country: "Australia"
    },
    {
      name: "Zik",
      startTime: "02:00",
      endTime: "04:00",
      genre: "Psytrance",
      day: "Domingo",
      country: "Greece"
    },
    {
      name: "Orestis",
      startTime: "04:00",
      endTime: "06:00",
      genre: "Psytrance",
      day: "Domingo",
      country: "Greece"
    },
    {
      name: "Zikore",
      startTime: "06:00",
      endTime: "08:00",
      genre: "Psytrance",
      day: "Domingo",
      country: "Greece"
    },
    {
      name: "Kindzadza",
      startTime: "08:00",
      endTime: "11:00",
      genre: "Psytrance",
      day: "Domingo",
      country: "Russia"
    },
    {
      name: "Audiopathik",
      startTime: "11:00",
      endTime: "13:00",
      genre: "Psytrance",
      day: "Domingo",
      country: "Mexico"
    },
    {
      name: "Pastor John",
      startTime: "13:00",
      endTime: "15:00",
      genre: "Psytrance",
      day: "Domingo",
      country: "South Africa"
    },
    {
      name: "Sonic System",
      startTime: "15:00",
      endTime: "17:00",
      genre: "Psytrance",
      day: "Domingo",
      country: "Italy"
    },
    {
      name: "Killatk vs Marambá",
      startTime: "17:00",
      endTime: "19:00",
      genre: "Psytrance",
      day: "Domingo",
      country: "Brazil"
    },
    {
      name: "Encerramento",
      startTime: "19:00",
      endTime: "20:00",
      genre: "Closing",
      day: "Domingo"
    }
  ];

  // Elementos DOM
  const currentTimeElement = document.getElementById('current-time');
  const nowPlayingElement = document.getElementById('now-playing');
  const lineupContainer = document.getElementById('lineup-container');
  const searchInput = document.getElementById('search-artist');
  const genreFilter = document.getElementById('genre-filter');

  // Função para atualizar o relógio
  function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    currentTimeElement.textContent = `${hours}:${minutes}:${seconds}`;
  }

  // Função para converter horário em minutos (para facilitar comparações)
  function timeToMinutes(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  }

  // Função para verificar qual artista está tocando agora
  function checkCurrentArtist() {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimeInMinutes = currentHours * 60 + currentMinutes;

    // Determinar o dia atual (sexta, sábado ou domingo)
    const dayOfWeek = now.getDay(); // 0 = domingo, 5 = sexta, 6 = sábado
    let currentDay;

    if (dayOfWeek === 5) {
      currentDay = "Sexta";
    } else if (dayOfWeek === 6) {
      currentDay = "Sábado";
    } else if (dayOfWeek === 0) {
      currentDay = "Domingo";
    } else {
      currentDay = null; // Não é um dia do festival
    }

    // Encontrar o artista atual
    let currentArtist = null;

    for (const artist of lineup) {
      // Verificar se é o dia correto do festival
      if (artist.day !== currentDay) continue;

      const startTimeInMinutes = timeToMinutes(artist.startTime);
      const endTimeInMinutes = timeToMinutes(artist.endTime);

      // Lidar com shows que passam da meia-noite
      if (endTimeInMinutes < startTimeInMinutes) {
        // Show passa da meia-noite
        if (currentTimeInMinutes >= startTimeInMinutes || currentTimeInMinutes < endTimeInMinutes) {
          currentArtist = artist;
          break;
        }
      } else {
        // Show normal
        if (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes) {
          currentArtist = artist;
          break;
        }
      }
    }

    // Atualizar a seção "Agora Tocando"
    if (currentArtist) {
      nowPlayingElement.innerHTML = `
                <div class="artist-name">${currentArtist.name}</div>
                <div class="set-time">${currentArtist.startTime} - ${currentArtist.endTime}</div>
                <div class="artist-genre">${currentArtist.genre}</div>
                <div class="artist-day">${currentArtist.day}</div>
            `;
    } else {
      nowPlayingElement.innerHTML = `
                <div class="artist-name">Intervalo</div>
                <div class="set-time">Próximo show em breve</div>
            `;
    }

    // Atualizar as classes dos cartões de artistas
    const artistCards = document.querySelectorAll('.artist-card');
    artistCards.forEach(card => {
      card.classList.remove('now-playing-card');

      if (currentArtist && card.dataset.artistName === currentArtist.name) {
        card.classList.add('now-playing-card');
      }
    });
  }

  // Função para popular o filtro de gêneros
  function populateGenreFilter() {
    // Obter todos os gêneros únicos
    const genres = [...new Set(lineup.map(artist => artist.genre))].sort();

    // Adicionar cada gênero como uma opção no select
    genres.forEach(genre => {
      const option = document.createElement('option');
      option.value = genre;
      option.textContent = genre;
      genreFilter.appendChild(option);
    });
  }

  // Função para obter o código ISO do país para a bandeira
  function getCountryCode(country) {
    // Mapeamento de países para códigos ISO de 2 letras (minúsculas)
    const countryCodes = {
      'Brazil': 'br',
      'Chile': 'cl',
      'UK': 'gb',
      'Netherlands': 'nl',
      'USA': 'us',
      'Australia': 'au',
      'Greece': 'gr',
      'Russia': 'ru',
      'Mexico': 'mx',
      'South Africa': 'za',
      'Italy': 'it'
    };

    return countryCodes[country] || 'unknown';
  }

  // Função para renderizar o line-up
  function renderLineup(filteredLineup = null) {
    const artistsToRender = filteredLineup || lineup;
    lineupContainer.innerHTML = '';

    // Criar containers para cada dia
    const daysContainer = {
      "Sexta": document.createElement('div'),
      "Sábado": document.createElement('div'),
      "Domingo": document.createElement('div')
    };

    // Configurar os containers de dias
    for (const day in daysContainer) {
      daysContainer[day].className = 'day-container';
      const dayHeader = document.createElement('h3');
      dayHeader.className = 'day-header';
      dayHeader.textContent = day;
      daysContainer[day].appendChild(dayHeader);

      // Criar o grid para os artistas deste dia
      const dayGrid = document.createElement('div');
      dayGrid.className = 'day-grid';
      daysContainer[day].appendChild(dayGrid);

      // Substituir o elemento no objeto para facilitar o acesso
      daysContainer[day] = dayGrid;
    }

    // Adicionar artistas aos respectivos dias
    artistsToRender.forEach(artist => {
      const artistCard = document.createElement('div');
      artistCard.className = 'artist-card';
      artistCard.dataset.artistName = artist.name;

      // Verificar se o artista tem um nome composto (com "vs")
      const hasVs = artist.name.toLowerCase().includes(' vs ');

      // Preparar o HTML para o card do artista
      let cardHTML = `
        <div class="artist-info">
            <div class="artist-header">
                <h3>${artist.name}</h3>
                ${artist.country ? `<span class="country-flag fi fi-${getCountryCode(artist.country)}" aria-label="Bandeira de ${artist.country}" title="${artist.country}"></span>` : ''}
            </div>
            <div class="artist-time">${artist.startTime} - ${artist.endTime}</div>
            <div class="artist-genre">${artist.genre}</div>
        </div>
      `;

      artistCard.innerHTML = cardHTML;

      // Adicionar ao container do dia correspondente
      daysContainer[artist.day].appendChild(artistCard);
    });

    // Adicionar os containers de dias ao lineup container
    for (const day in daysContainer) {
      // Verificar se há artistas neste dia após a filtragem
      if (daysContainer[day].children.length > 0) {
        // Obter o container pai (que contém o título do dia)
        const parentContainer = daysContainer[day].parentNode;
        lineupContainer.appendChild(parentContainer);
      }
    }
  }

  // Função para filtrar artistas com base na pesquisa e no gênero selecionado
  function filterArtists() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedGenre = genreFilter.value;

    let filtered = lineup;

    // Aplicar filtro de pesquisa
    if (searchTerm) {
      filtered = filtered.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm) ||
        artist.genre.toLowerCase().includes(searchTerm)
      );
    }

    // Aplicar filtro de gênero
    if (selectedGenre) {
      filtered = filtered.filter(artist => artist.genre === selectedGenre);
    }

    renderLineup(filtered);
  }

  // Adicionar eventos de filtro
  if (searchInput) {
    searchInput.addEventListener('input', filterArtists);
  }

  if (genreFilter) {
    genreFilter.addEventListener('change', filterArtists);
  }

  // Inicializar a página
  updateClock();
  populateGenreFilter();
  renderLineup();
  checkCurrentArtist();

  // Atualizar o relógio e o artista atual a cada segundo
  setInterval(() => {
    updateClock();
    checkCurrentArtist();
  }, 1000);

  // Efeitos visuais adicionais
  const pulse = document.querySelector('.pulse');

  // Função para criar um efeito de pulso aleatório
  function randomizePulse() {
    const size = Math.random() * 50 + 150; // Tamanho entre 150px e 200px
    pulse.style.width = `${size}px`;
    pulse.style.height = `${size}px`;

    setTimeout(randomizePulse, Math.random() * 2000 + 1000); // Entre 1 e 3 segundos
  }

  randomizePulse();
}); 