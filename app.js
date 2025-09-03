/**
 * Campaign & UTM Naming Generator
 * Modular JavaScript implementation with state-driven UI
 */

// Immediately Invoked Function Expression (IIFE) to avoid polluting global scope
(function() {
    'use strict';

    // ===== STATE MANAGEMENT =====
    const appState = {
        // Plataforma ativa
        activePlatform: 'META',
        
        // Estrutura de plataformas com opções e dicionários específicos
        platforms: {
            'META': {
                options: {
                    tipo: ['CBO', 'ABO', 'PROSPECT', 'RETARGET', 'LOOKALIKE', 'VENDAS', 'LANCAMENTO'],
                    objetivo: ['CONV', 'TRAF', 'MENS', 'CAD', 'ENG', 'VISUALIZACAO'],
                    estrategia: ['VENDAS', 'AIDA', 'TOFU', 'MOFU', 'BOFU', 'ASC'],
                    publico: ['LALA1', 'LALA3', 'LALA5', 'SEMENTE', 'INTERESSE', 'CLIENTES', 'ENGAG', 'SITE30D', 'COMPRADORES'],
                    genero: ['UNISSEX', 'M', 'F'],
                    posicionamento: ['AUTO', 'FEED', 'STORY', 'REELS', 'TODOS'],
                    formato: ['VIDEO', 'IMG', 'CARROSSEL', 'REELS', 'STORIE'],
                    apelo: ['OFERTA', 'PROVA_SOCIAL', 'BENEFICIO', 'SENSO_DE_URGENCIA'],
                    utm_medium: ['INSTAGRAM', 'FACEBOOK']
                },
                dictionary: {
                    // TIPO
                    'PROSPECT': 'Para prospecção de novos clientes',
                    'RETARGET': 'Para retargeting de clientes que já interagiram',
                    'LOOKALIKE': 'Para públicos semelhantes (Lookalike)',
                    'CBO': 'Otimização de orçamento da campanha (Campaign Budget Optimization)',
                    'ABO': 'Otimização de orçamento do conjunto de anúncios (Adset Budget Optimization)',
                    'VENDAS': 'Campanha focada em vendas diretas',
                    'LANCAMENTO': 'Campanha para lançamento de produtos ou serviços',
                    // OBJETIVO
                    'CONV': 'Conversão (otimizada para ações como compras ou cadastros)',
                    'TRAF': 'Tráfego (levar usuários para um site ou aplicativo)',
                    'MENS': 'Mensagens (iniciar conversas com potenciais clientes)',
                    'CAD': 'Cadastro (geração de leads através de formulários)',
                    'ENG': 'Engajamento (aumentar interações com posts ou página)',
                    'VISUALIZACAO': 'Visualização de Vídeo (aumentar o número de visualizações)',
                    // ESTRATEGIA
                    'AIDA': 'Funil AIDA (Atenção, Interesse, Desejo, Ação)',
                    'TOFU': 'Topo de Funil (focado em alcance e reconhecimento da marca)',
                    'MOFU': 'Meio de Funil (focado em consideração e engajamento)',
                    'BOFU': 'Fundo de Funil (focado em conversão e decisão de compra)',
                    'ASC': 'Advantage+ Shopping Campaign (campanha de vendas automatizada)',
                    // PUBLICO
                    'SEMENTE': 'Público inicial ou base para criação de outros públicos',
                    'INTERESSE': 'Segmentação baseada nos interesses dos usuários',
                    'LALA1': 'Lookalike 1% (público mais semelhante à base original)',
                    'LALA3': 'Lookalike 3% (público com semelhança intermediária)',
                    'LALA5': 'Lookalike 5% (público mais amplo e menos semelhante)',
                    'CLIENTES': 'Público formado pela lista de clientes atuais',
                    'ENGAG': 'Público que engajou com a página ou conteúdo',
                    'SITE30D': 'Visitantes do site nos últimos 30 dias',
                    'COMPRADORES': 'Público de pessoas que já compraram',
                    // GENERO
                    'M': 'Gênero Masculino',
                    'F': 'Gênero Feminino',
                    'UNISSEX': 'Ambos os gêneros',
                    // POSICIONAMENTO
                    'AUTO': 'Posicionamento Automático (Meta otimiza onde o anúncio aparece)',
                    'FEED': 'Posicionamento nos Feeds (Facebook e Instagram)',
                    'STORY': 'Posicionamento nos Stories (Facebook, Instagram, Messenger)',
                    'REELS': 'Posicionamento no Reels (Instagram e Facebook)',
                    'TODOS': 'Todos os posicionamentos disponíveis',
                    // FORMATO
                    'IMG': 'Formato de Imagem única',
                    'CARROSSEL': 'Formato com duas ou mais imagens/vídeos roláveis',
                    'VIDEO': 'Formato de Vídeo único',
                    'STORIE': 'Formato vertical para Stories (variação de STORY)',
                    // APELO
                    'OFERTA': 'Apelo focado em uma oferta, desconto ou promoção',
                    'PROVA_SOCIAL': 'Apelo com depoimentos e provas sociais',
                    'BENEFICIO': 'Apelo focado nos benefícios do produto/serviço',
                    'SENSO_DE_URGENCIA': 'Apelo que cria a necessidade de uma ação imediata'
                }
            },
            'GOOGLE': {
                options: {
                    // Nomenclatura da Campanha: OBJETIVO_ESTRATEGIA_PUBLICO_DATA
                    objetivo: ['VENDAS', 'LEADS', 'TRAF', 'BRAND', 'APP'],
                    estrategia: ['PERFMAX', 'PESQUISA', 'SHOPPING', 'DISPLAY', 'VIDEO', 'REMARK', 'PROSPEC'],
                    publico: ['AFINIDADE', 'MERCADO', 'LISTA_CLIENTES', 'REMARKET', 'DEMO', 'KEYWORDS'],
                    
                    // Nomenclatura do Conjunto/Grupo: GEOLOC_IDADE_GENERO_TIPO_LANCE
                    genero: ['M', 'F', 'UNISSEX'],
                    posicionamento: ['SEARCH', 'DISCOVERY', 'YOUTUBE', 'GMAIL'],
                    apelo: ['MAX_CONV', 'CPA_ALVO', 'ROAS_ALVO', 'MAX_CLICKS'],
                    
                    // Nomenclatura do Anúncio: FORMATO_MENSAGEM_V
                    formato: ['TEXTO', 'RESPONSIVO', 'IMG', 'VIDEO', 'CARROSSEL'],
                    tipo: ['OFERTA', 'BENEFICIO', 'PROVA', 'URGENCIA', 'GERAL'],
                    
                    // UTM Medium
                    utm_medium: ['GOOGLE', 'SEARCH', 'DISPLAY', 'YOUTUBE']
                },
                dictionary: {
                    'VENDAS': 'Otimizado para vendas e receita.',
                    'LEADS': 'Otimizado para aquisição de contatos.',
                    'TRAF': 'Otimizado para tráfego do site.',
                    'BRAND': 'Otimizado para reconhecimento de marca.',
                    'APP': 'Otimizado para instalações de aplicativos.',
                    'PERFMAX': 'Performance Max (automatizada).',
                    'PESQUISA': 'Campanhas na Rede de Pesquisa.',
                    'SHOPPING': 'Campanhas de Shopping.',
                    'DISPLAY': 'Campanhas da Rede de Display.',
                    'VIDEO': 'Campanhas de Vídeo (YouTube).',
                    'REMARK': 'Remarketing (fundo de funil).',
                    'PROSPEC': 'Prospecção de novos clientes (topo de funil).',
                    'AFINIDADE': 'Público com interesses amplos.',
                    'MERCADO': 'Público com intenção de compra.',
                    'LISTA_CLIENTES': 'Segmentação por lista de clientes (e-mail).',
                    'REMARKET': 'Público que já interagiu com a marca.',
                    'DEMO': 'Segmentação demográfica.',
                    'KEYWORDS': 'Segmentação por palavras-chave.',
                    'BR': 'Brasil.',
                    'SP': 'São Paulo.',
                    'TODOS': 'Nenhuma segmentação geográfica.',
                    'M': 'Masculino.',
                    'F': 'Feminino.',
                    'UNISSEX': 'Ambos os gêneros.',
                    'SEARCH': 'Anúncios na Rede de Pesquisa.',
                    'DISCOVERY': 'Anúncios no feed de descoberta.',
                    'YOUTUBE': 'Anúncios no YouTube.',
                    'GMAIL': 'Anúncios no Gmail.',
                    'MAX_CONV': 'Maximizar Conversões.',
                    'CPA_ALVO': 'Custo por Aquisição Alvo.',
                    'ROAS_ALVO': 'Retorno do Investimento em Publicidade Alvo.',
                    'MAX_CLICKS': 'Maximizar Cliques.',
                    'TEXTO': 'Anúncio de texto (Pesquisa).',
                    'RESPONSIVO': 'Anúncio responsivo (Display).',
                    'IMG': 'Imagem estática (Display/Apps).',
                    'CARROSSEL': 'Anúncio em formato carrossel.',
                    'OFERTA': 'Promoção ou desconto.',
                    'BENEFICIO': 'Foco nos benefícios do produto.',
                    'PROVA': 'Depoimentos ou prova social.',
                    'URGENCIA': 'Senso de escassez ou urgência.',
                    'GERAL': 'Mensagem mais ampla, sem foco específico.'
                }
            }
        },
        
        // Field labels for UI
        fieldLabels: {
            tipo: 'TIPO', 
            objetivo: 'OBJETIVO', 
            estrategia: 'ESTRATEGIA', 
            publico: 'PÚBLICO',
            genero: 'GÊNERO', 
            posicionamento: 'POSICIONAMENTO', 
            formato: 'FORMATO',
            apelo: 'APELO', 
            utm_medium: 'UTM Medium'
        },
        
        // Current field being edited in options manager
        currentEditField: '',
        
        // Generated outputs
        outputs: {
            campaignName: '',
            adsetName: '',
            adName: '',
            utmString: ''
        }
    };

    // ===== DOM ELEMENTS =====
    const elements = {
        form: document.getElementById('naming-form'),
        campaignOutput: document.getElementById('campaign-name-output'),
        adsetOutput: document.getElementById('adset-name-output'),
        adOutput: document.getElementById('ad-name-output'),
        utmOutput: document.getElementById('utm-output'),
        dateField: document.getElementById('data'),
        tooltip: document.getElementById('tooltip'),
        notification: document.getElementById('notification'),
        fieldToEditSelect: document.getElementById('field-to-edit'),
        optionsManagerDiv: document.getElementById('options-manager'),
        newOptionInput: document.getElementById('new-option-input'),
        addOptionBtn: document.getElementById('add-option-btn'),
        dictTermSelect: document.getElementById('dict-term-select'),
        dictTermMeaning: document.getElementById('dict-term-meaning'),
        saveDictTermBtn: document.getElementById('save-dict-term-btn'),
        deleteDictTermBtn: document.getElementById('delete-dict-term-btn'),
        newDictTerm: document.getElementById('new-dict-term'),
        newDictMeaning: document.getElementById('new-dict-meaning'),
        addDictTermBtn: document.getElementById('add-dict-term-btn'),
        dictActionsNormal: document.getElementById('dict-actions-normal'),
        dictActionsConfirm: document.getElementById('dict-actions-confirm'),
        confirmDeleteDictBtn: document.getElementById('confirm-delete-dict-btn'),
        cancelDeleteDictBtn: document.getElementById('cancel-delete-dict-btn'),
        copyButtons: document.querySelectorAll('.copy-btn'),
        tooltipTargets: document.querySelectorAll('.tooltip-target')
    };

    // ===== HELPER FUNCTIONS =====
    
    /**
     * Creates a DOM element with specified attributes
     * @param {string} tag - HTML tag name
     * @param {Object} attributes - Element attributes
     * @param {string|Node|Array} [children] - Child elements or text content
     * @returns {HTMLElement} - The created element
     */
    function createElement(tag, attributes = {}, children = null) {
        const element = document.createElement(tag);
        
        // Set attributes
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'textContent') {
                element.textContent = value;
            } else if (key === 'innerHTML') {
                element.innerHTML = value;
            } else if (key === 'dataset') {
                Object.entries(value).forEach(([dataKey, dataValue]) => {
                    element.dataset[dataKey] = dataValue;
                });
            } else if (key === 'events') {
                Object.entries(value).forEach(([event, handler]) => {
                    element.addEventListener(event, handler);
                });
            } else {
                element.setAttribute(key, value);
            };
        });
        
        // Add children
        if (children) {
            if (Array.isArray(children)) {
                children.forEach(child => {
                    if (child instanceof Node) {
                        element.appendChild(child);
                    } else if (typeof child === 'string') {
                        element.appendChild(document.createTextNode(child));
                    }
                });
            } else if (children instanceof Node) {
                element.appendChild(children);
            } else if (typeof children === 'string') {
                element.textContent = children;
            }
        }
        
        return element;
    }

    /**
     * Shows a notification message
     * @param {string} message - Message to display
     * @param {boolean} isError - Whether it's an error message
     */
    let notificationTimeout;
    function showNotification(message, isError = false) {
        clearTimeout(notificationTimeout);
        elements.notification.textContent = message;
        elements.notification.style.backgroundColor = isError ? '#C53030' : '#2F855A';
        elements.notification.style.bottom = '20px';
        notificationTimeout = setTimeout(() => {
            elements.notification.style.bottom = '-100px';
        }, 3000);
    }

    // ===== PERSISTENCE FUNCTIONS =====
    
    /**
     * Save platforms data to localStorage
     */
    function savePlatformsToLocalStorage() {
        localStorage.setItem('nomenclaturePlatforms', JSON.stringify(appState.platforms));
        localStorage.setItem('activeNomenclaturePlatform', appState.activePlatform);
    }
    
    /**
     * Save options to localStorage
     */
    function saveOptionsToLocalStorage() {
        // Esta função agora é um wrapper para savePlatformsToLocalStorage
        savePlatformsToLocalStorage();
    }
    
    /**
     * Save dictionary to localStorage
     */
    function saveDictionaryToLocalStorage() {
        // Esta função agora é um wrapper para savePlatformsToLocalStorage
        savePlatformsToLocalStorage();
    }
    
    /**
     * Save form inputs to localStorage
     */
    function saveInputsToLocalStorage() {
        const inputsToSave = {};
        document.querySelectorAll('.persist').forEach(input => {
            inputsToSave[input.id] = input.value;
        });
        localStorage.setItem('metaNomenclatureInputs', JSON.stringify(inputsToSave));
    }
    
    /**
     * Load form inputs from localStorage
     */
    function loadInputsFromLocalStorage() {
        const savedInputs = localStorage.getItem('metaNomenclatureInputs');
        if (savedInputs) {
            try {
                const inputs = JSON.parse(savedInputs);
                for (const id in inputs) {
                    const element = document.getElementById(id);
                    if (element) element.value = inputs[id];
                }
            } catch (e) {
                console.error("Erro ao carregar valores dos campos:", e);
            }
        }
    }
    
    /**
     * Load saved data from localStorage
     */
    function loadSavedData() {
        // Load platforms data
        const savedPlatforms = localStorage.getItem('nomenclaturePlatforms');
        if (savedPlatforms) {
            try { 
                appState.platforms = JSON.parse(savedPlatforms); 
            } catch (e) { 
                console.error("Erro ao carregar dados de plataformas:", e); 
            }
        }
        
        // Load active platform
        const savedActivePlatform = localStorage.getItem('activeNomenclaturePlatform');
        if (savedActivePlatform) {
            appState.activePlatform = savedActivePlatform;
        }
        
        // Compatibilidade com versão anterior
        const savedOptions = localStorage.getItem('metaNomenclatureOptions');
        const savedDictionary = localStorage.getItem('metaDictionaryData');
        
        if (savedOptions && !savedPlatforms) {
            try {
                const options = JSON.parse(savedOptions);
                appState.platforms.META.options = options;
            } catch (e) {
                console.error("Erro ao migrar opções salvas:", e);
            }
        }
        
        if (savedDictionary && !savedPlatforms) {
            try {
                const dictionary = JSON.parse(savedDictionary);
                appState.platforms.META.dictionary = dictionary;
            } catch (e) {
                console.error("Erro ao migrar dicionário salvo:", e);
            }
        }
        
        // Load inputs
        if (!localStorage.getItem('metaNomenclatureInputs')) {
            const now = new Date();
            elements.dateField.value = `${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`;
        } else {
            loadInputsFromLocalStorage();
        }
        
        // Atualizar o seletor de plataforma
        const platformSelect = document.getElementById('plataforma');
        if (platformSelect) {
            platformSelect.value = appState.activePlatform;
        }
    }

    // ===== RENDER FUNCTIONS =====
    
    /**
     * Updates a dropdown with options from state
     * @param {string} fieldKey - Field identifier
     */
    function updateDropdown(fieldKey) {
        const selectElement = document.getElementById(fieldKey);
        if (!selectElement) return;
        
        const selectedValue = selectElement.value;
        selectElement.innerHTML = '';
        
        // Usar as opções da plataforma ativa
        const platformOptions = appState.platforms[appState.activePlatform].options;
        
        if (platformOptions[fieldKey]) {
            platformOptions[fieldKey].forEach(optionText => {
                const option = new Option(optionText, optionText);
                selectElement.add(option);
            });
            
            if (platformOptions[fieldKey].includes(selectedValue)) {
                selectElement.value = selectedValue;
            }
        }
    }
    
    /**
     * Displays options for a field in the options manager
     * @param {string} fieldKey - Field identifier
     */
    function displayOptionsFor(fieldKey) {
        elements.optionsManagerDiv.innerHTML = '';
        
        // Usar as opções da plataforma ativa
        const platformOptions = appState.platforms[appState.activePlatform].options;
        
        if (!platformOptions[fieldKey]) return;
        
        platformOptions[fieldKey].forEach((optionText, index) => {
            const itemDiv = createElement('div', {
                className: 'flex items-center justify-between bg-gray-100 p-2 rounded'
            }, [
                createElement('span', {}, optionText),
                createElement('div', { className: 'flex gap-2' }, [
                    createElement('button', {
                        type: 'button',
                        className: 'manager-btn edit-btn',
                        dataset: { action: 'edit', index: index },
                        textContent: 'Alterar'
                    }),
                    createElement('button', {
                        type: 'button',
                        className: 'manager-btn delete-btn',
                        dataset: { action: 'delete', index: index },
                        textContent: 'Excluir'
                    })
                ])
            ]);
            
            elements.optionsManagerDiv.appendChild(itemDiv);
        });
    }
    
    /**
     * Shows UI for editing an option
     * @param {string} fieldKey - Field identifier
     * @param {number} index - Option index
     */
    function showEditUI(fieldKey, index) {
        const itemDiv = elements.optionsManagerDiv.children[index];
        if (!itemDiv) return;

        // Usar as opções da plataforma ativa
        const platformOptions = appState.platforms[appState.activePlatform].options;
        const originalText = platformOptions[fieldKey][index];
        itemDiv.innerHTML = '';

        const input = createElement('input', {
            type: 'text',
            value: originalText,
            className: 'flex-grow border rounded px-2 py-1 text-sm bg-white'
        });

        const buttonsDiv = createElement('div', { className: 'flex gap-2' });

        const confirmBtn = createElement('button', {
            textContent: 'Confirmar',
            type: 'button',
            className: 'manager-btn confirm-btn',
            events: {
                click: () => {
                    const newValue = input.value.trim().toUpperCase();
                    if (newValue && newValue !== originalText) {
                        // Atualizar na plataforma ativa
                        appState.platforms[appState.activePlatform].options[fieldKey][index] = newValue;
                        saveOptionsToLocalStorage();
                        updateDropdown(fieldKey);
                        generateNames();
                    }
                    displayOptionsFor(fieldKey);
                }
            }
        });

        const cancelBtn = createElement('button', {
            textContent: 'Cancelar',
            type: 'button',
            className: 'manager-btn cancel-btn',
            events: {
                click: () => displayOptionsFor(fieldKey)
            }
        });
        
        buttonsDiv.appendChild(confirmBtn);
        buttonsDiv.appendChild(cancelBtn);
        itemDiv.appendChild(input);
        itemDiv.appendChild(buttonsDiv);
        input.focus();
    }
    
    /**
     * Shows UI for deleting an option
     * @param {string} fieldKey - Field identifier
     * @param {number} index - Option index
     */
    function deleteOption(fieldKey, index) {
        const itemDiv = elements.optionsManagerDiv.children[index];
        if (!itemDiv || itemDiv.dataset.isConfirming) return;
        
        itemDiv.dataset.isConfirming = 'true';
        itemDiv.classList.add('bg-red-100');
        
        itemDiv.innerHTML = '';

        const textSpan = createElement('span', {
            textContent: 'Tem certeza?',
            className: 'text-red-700 font-semibold'
        });

        const buttonsDiv = createElement('div', { className: 'flex gap-2' });

        const confirmBtn = createElement('button', {
            textContent: 'Excluir',
            type: 'button',
            className: 'manager-btn delete-btn',
            events: {
                click: () => {
                    // Remover da plataforma ativa
                    appState.platforms[appState.activePlatform].options[fieldKey].splice(index, 1);
                    saveOptionsToLocalStorage();
                    updateDropdown(fieldKey);
                    displayOptionsFor(fieldKey);
                    generateNames();
                }
            }
        });

        const cancelBtn = createElement('button', {
            textContent: 'Cancelar',
            type: 'button',
            className: 'manager-btn cancel-btn',
            events: {
                click: () => displayOptionsFor(fieldKey)
            }
        });
        
        buttonsDiv.appendChild(confirmBtn);
        buttonsDiv.appendChild(cancelBtn);
        itemDiv.appendChild(textSpan);
        itemDiv.appendChild(buttonsDiv);
    }
    
    /**
     * Populates the dictionary editor with terms
     */
    function populateDictionaryEditor() {
        // Usar o dicionário da plataforma ativa
        const platformDictionary = appState.platforms[appState.activePlatform].dictionary;
        const terms = Object.keys(platformDictionary).sort();
        const currentSelection = elements.dictTermSelect.value;
        elements.dictTermSelect.innerHTML = '';
        
        terms.forEach(term => {
            const option = new Option(term, term);
            elements.dictTermSelect.add(option);
        });

        if (terms.includes(currentSelection)) {
           elements.dictTermSelect.value = currentSelection;
        } else if (terms.length > 0) {
            elements.dictTermSelect.value = terms[0];
        }
        
        elements.dictTermMeaning.value = platformDictionary[elements.dictTermSelect.value] || '';
    }
    
    /**
     * Updates the output displays with generated names
     */
    function updateOutputDisplay() {
        elements.campaignOutput.textContent = appState.outputs.campaignName;
        elements.adsetOutput.textContent = appState.outputs.adsetName;
        elements.adOutput.textContent = appState.outputs.adName;
        elements.utmOutput.textContent = appState.outputs.utmString;
    }

    // ===== CORE FUNCTIONS =====
    
    /**
     * Generates campaign, adset, ad names and UTM parameters
     */
    function generateNames() {
        const getValue = id => document.getElementById(id).value;
        
        // Gerar nomes com base na plataforma ativa
        if (appState.activePlatform === 'META') {
            // Nomenclatura para Meta Ads
            appState.outputs.campaignName = `${getValue('tipo')}_${getValue('objetivo')}_${getValue('estrategia')}_${getValue('publico')}_${getValue('data')}`;
            appState.outputs.adsetName = `${getValue('pais').replace(/\s+/g, '_').toUpperCase()}_${getValue('cidade').replace(/\s+/g, '_').toUpperCase()}_${getValue('idade').replace(/\s+/g, '')}_${getValue('genero')}_${getValue('posicionamento')}`;
            appState.outputs.adName = `${getValue('id_anuncio')}_${getValue('formato')}_${getValue('descricao').replace(/\s+/g, '_').toUpperCase()}_${getValue('apelo')}`;
            appState.outputs.utmString = `utm_source=META&utm_medium=${getValue('utm_medium')}&utm_campaign=${appState.outputs.campaignName}&utm_content=${appState.outputs.adName}`;
        } else if (appState.activePlatform === 'GOOGLE') {
            // Nomenclatura para Google Ads
            // Campanha: OBJETIVO_ESTRATEGIA_PUBLICO_DATA
            appState.outputs.campaignName = `${getValue('objetivo')}_${getValue('estrategia')}_${getValue('publico')}_${getValue('data')}`;
            
            // Conjunto/Grupo: GEOLOC_IDADE_GENERO_TIPO_LANCE
            appState.outputs.adsetName = `${getValue('pais').replace(/\s+/g, '_').toUpperCase()}_${getValue('idade').replace(/\s+/g, '')}_${getValue('genero')}_${getValue('posicionamento')}_${getValue('apelo')}`;
            
            // Anúncio: FORMATO_MENSAGEM_V
            appState.outputs.adName = `${getValue('formato')}_${getValue('tipo')}_V${getValue('id_anuncio')}`;
            
            // UTM
            appState.outputs.utmString = `utm_source=GOOGLE&utm_medium=${getValue('utm_medium')}&utm_campaign=${appState.outputs.campaignName}&utm_content=${appState.outputs.adName}`;
        }
        
        updateOutputDisplay();
    }
    
    /**
     * Updates a dictionary term
     */
    function updateDictionaryTerm() {
        const selectedTerm = elements.dictTermSelect.value;
        if (!selectedTerm) return;
        
        // Atualizar no dicionário da plataforma ativa
        appState.platforms[appState.activePlatform].dictionary[selectedTerm] = elements.dictTermMeaning.value;
        saveDictionaryToLocalStorage();
        showNotification(`Significado de "${selectedTerm}" atualizado!`);
    }
    
    /**
     * Deletes a dictionary term
     */
    function deleteDictionaryTerm() {
        const selectedTerm = elements.dictTermSelect.value;
        if (!selectedTerm) return;
        
        // Remover do dicionário da plataforma ativa
        delete appState.platforms[appState.activePlatform].dictionary[selectedTerm];
        saveDictionaryToLocalStorage();
        populateDictionaryEditor();
        showNotification(`Termo "${selectedTerm}" excluído.`);

        elements.dictActionsConfirm.classList.add('hidden');
        elements.dictActionsNormal.classList.remove('hidden');
    }
    
    /**
     * Adds a new dictionary term
     */
    function addNewDictionaryTerm() {
        const term = elements.newDictTerm.value.trim().toUpperCase();
        const meaning = elements.newDictMeaning.value.trim();
        
        if (!term || !meaning) {
            showNotification('Ambos os campos, termo e significado, devem ser preenchidos.', true);
            return;
        }
        
        // Adicionar ao dicionário da plataforma ativa
        appState.platforms[appState.activePlatform].dictionary[term] = meaning;
        saveDictionaryToLocalStorage();
        populateDictionaryEditor();
        elements.dictTermSelect.value = term;
        elements.newDictTerm.value = '';
        elements.newDictMeaning.value = '';
        showNotification(`Termo "${term}" adicionado ao dicionário!`);
    }
    
    /**
     * Adds a new option to a field
     */
    function addOption() {
        const fieldKey = elements.fieldToEditSelect.value;
        const newOption = elements.newOptionInput.value.trim().toUpperCase();
        
        // Usar as opções da plataforma ativa
        const platformOptions = appState.platforms[appState.activePlatform].options;
        
        if (newOption && !platformOptions[fieldKey].includes(newOption)) {
            platformOptions[fieldKey].push(newOption);
            saveOptionsToLocalStorage();
            elements.newOptionInput.value = '';
            updateDropdown(fieldKey);
            displayOptionsFor(fieldKey);
            generateNames();
        } else {
            showNotification('A opção não pode estar vazia ou já existir na lista.', true);
        }
    }
    
    /**
     * Handles clicks in the options manager
     * @param {Event} event - Click event
     */
    function handleManagerClick(event) {
        const button = event.target.closest('.manager-btn');
        if (!button) return;
        
        const { action, index } = button.dataset;
        if (action === undefined || index === undefined) return;
        
        const fieldKey = elements.fieldToEditSelect.value;
        const numericIndex = parseInt(index, 10);
        
        if (action === 'edit') {
            showEditUI(fieldKey, numericIndex);
        } else if (action === 'delete') {
            deleteOption(fieldKey, numericIndex);
        }
    }
    
    // ===== TOOLTIP FUNCTIONS =====
    
    /**
     * Shows tooltip with term meaning
     * @param {Event} e - Mouse event
     */
    function showTooltip(e) {
        const term = e.target.value;
        // Usar o dicionário da plataforma ativa
        const platformDictionary = appState.platforms[appState.activePlatform].dictionary;
        const meaning = platformDictionary[term];
        
        if (meaning) {
            elements.tooltip.textContent = meaning;
            const rect = e.target.getBoundingClientRect();
            elements.tooltip.style.left = `${rect.right + 10}px`;
            elements.tooltip.style.top = `${rect.top + window.scrollY}px`;
            elements.tooltip.style.display = 'block';
            setTimeout(() => { elements.tooltip.style.opacity = 1; }, 10);
        } else {
            hideTooltip();
        }
    }
    
    /**
     * Hides the tooltip
     */
    function hideTooltip() {
        elements.tooltip.style.opacity = 0;
        setTimeout(() => { 
            if (elements.tooltip.style.opacity === '0') {
                elements.tooltip.style.display = 'none'; 
            }
        }, 200);
    }
    
    // ===== CLIPBOARD FUNCTIONS =====
    
    /**
     * Copies text to clipboard using modern Clipboard API
     * @param {string} text - Text to copy
     * @param {HTMLElement} button - Button that triggered the copy
     */
    async function copyToClipboard(text, button) {
        try {
            await navigator.clipboard.writeText(text);
            button.textContent = 'Copiado!';
            button.classList.add('copied');
            setTimeout(() => {
                button.textContent = 'Copiar';
                button.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('Erro ao copiar texto: ', err);
            showNotification('Não foi possível copiar o texto. Verifique as permissões.', true);
        }
    }

    /**
     * Atualiza todos os dropdowns com base na plataforma selecionada
     */
    function updateAllDropdowns() {
        // Atualizar todos os dropdowns com base na plataforma ativa
        const platformOptions = appState.platforms[appState.activePlatform].options;
        Object.keys(platformOptions).forEach(key => updateDropdown(key));
    }
    
    /**
     * Manipula a mudança de plataforma
     */
    function handlePlatformChange() {
        const platformSelect = document.getElementById('plataforma');
        if (!platformSelect) return;
        
        appState.activePlatform = platformSelect.value;
        savePlatformsToLocalStorage();
        
        // Atualizar todos os dropdowns
        updateAllDropdowns();
        
        // Atualizar o gerenciador de opções
        appState.currentEditField = elements.fieldToEditSelect.value;
        displayOptionsFor(appState.currentEditField);
        
        // Atualizar o editor de dicionário
        populateDictionaryEditor();
        
        // Gerar novos nomes
        generateNames();
        
        showNotification(`Plataforma alterada para ${appState.activePlatform}`);
    }
    
    // ===== EVENT LISTENERS =====
    
    /**
     * Sets up all event listeners
     */
    function setupEventListeners() {
        // Plataforma change
        const platformSelect = document.getElementById('plataforma');
        if (platformSelect) {
            platformSelect.addEventListener('change', handlePlatformChange);
        }
        
        // Form input changes
        elements.form.querySelectorAll('input, select').forEach(el => {
            el.addEventListener('input', () => {
                if (el.id !== 'plataforma') { // Evitar loop infinito
                    generateNames();
                    saveInputsToLocalStorage();
                }
            });
        });
        
        // Options manager
        elements.optionsManagerDiv.addEventListener('click', handleManagerClick);
        elements.fieldToEditSelect.addEventListener('change', () => {
            appState.currentEditField = elements.fieldToEditSelect.value;
            displayOptionsFor(appState.currentEditField);
        });
        elements.addOptionBtn.addEventListener('click', addOption);
        
        // Dictionary
        elements.dictTermSelect.addEventListener('change', () => {
            elements.dictTermMeaning.value = appState.dictionary[elements.dictTermSelect.value] || '';
        });
        elements.saveDictTermBtn.addEventListener('click', updateDictionaryTerm);
        elements.deleteDictTermBtn.addEventListener('click', () => {
            if (!elements.dictTermSelect.value) {
                showNotification("Selecione um termo para excluir.", true);
                return;
            }
            elements.dictActionsNormal.classList.add('hidden');
            elements.dictActionsConfirm.classList.remove('hidden');
        });
        elements.cancelDeleteDictBtn.addEventListener('click', () => {
            elements.dictActionsConfirm.classList.add('hidden');
            elements.dictActionsNormal.classList.remove('hidden');
        });
        elements.confirmDeleteDictBtn.addEventListener('click', deleteDictionaryTerm);
        elements.addDictTermBtn.addEventListener('click', addNewDictionaryTerm);
        
        // Tooltips
        elements.tooltipTargets.forEach(el => {
            el.addEventListener('mouseenter', showTooltip);
            el.addEventListener('mouseleave', hideTooltip);
            el.addEventListener('change', showTooltip);
        });
        
        // Copy buttons
        elements.copyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.dataset.target;
        let textToCopy = document.getElementById(targetId).textContent; // Use 'let' para poder modificar a variável

        // MODIFICAÇÃO AQUI: Verifica se o alvo é o 'utm-output'
        if (targetId === 'utm-output') {
            textToCopy = textToCopy.toLowerCase(); // Converte o texto para minúsculo
        }

        copyToClipboard(textToCopy, button);
    });
});
    }

    // ===== INITIALIZATION =====
    
    /**
     * Initializes the application
     */
    function initialize() {
        // Load saved data
        loadSavedData();
        
        // Setup field to edit dropdown
        Object.keys(appState.fieldLabels).forEach(key => {
            elements.fieldToEditSelect.add(new Option(appState.fieldLabels[key], key));
        });
        
        // Update all dropdowns com base na plataforma ativa
        updateAllDropdowns();
        
        // Set current edit field
        appState.currentEditField = elements.fieldToEditSelect.value;
        displayOptionsFor(appState.currentEditField);
        
        // Setup dictionary
        populateDictionaryEditor();
        
        // Setup event listeners
        setupEventListeners();
        
        // Generate initial names
        generateNames();
    }

    // Start the application when DOM is loaded
    document.addEventListener('DOMContentLoaded', initialize);
})();