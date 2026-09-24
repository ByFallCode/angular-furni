(function() {
	'use strict';

	var tinyslider = function() {
		var el = document.querySelectorAll('.testimonial-slider');

		if (el.length > 0) {
			var slider = tns({
				container: '.testimonial-slider',
				items: 1,
				axis: "horizontal",
				controlsContainer: "#testimonial-nav",
				swipeAngle: false,
				speed: 700,
				nav: true,
				controls: true,
				autoplay: true,
				autoplayHoverPause: true,
				autoplayTimeout: 3500,
				autoplayButtonOutput: false
			});
		}
	};
	tinyslider();

	


	var sitePlusMinus = function() {

		var value,
    		quantity = document.getElementsByClassName('quantity-container');

		function createBindings(quantityContainer) {
	      var quantityAmount = quantityContainer.getElementsByClassName('quantity-amount')[0];
	      var increase = quantityContainer.getElementsByClassName('increase')[0];
	      var decrease = quantityContainer.getElementsByClassName('decrease')[0];
	      increase.addEventListener('click', function (e) { increaseValue(e, quantityAmount); });
	      decrease.addEventListener('click', function (e) { decreaseValue(e, quantityAmount); });
	    }

	    function init() {
	        for (var i = 0; i < quantity.length; i++ ) {
						createBindings(quantity[i]);
	        }
	    };

	    function increaseValue(event, quantityAmount) {
	        value = parseInt(quantityAmount.value, 10);

	        console.log(quantityAmount, quantityAmount.value);

	        value = isNaN(value) ? 0 : value;
	        value++;
	        quantityAmount.value = value;
	    }

	    function decreaseValue(event, quantityAmount) {
	        value = parseInt(quantityAmount.value, 10);

	        value = isNaN(value) ? 0 : value;
	        if (value > 0) value--;

	        quantityAmount.value = value;
	    }
	    
	    init();
		
	};
	sitePlusMinus();

	var adminAuth = function() {
		var body = document.body;
		if (!body) {
			return;
		}

		var page = body.getAttribute('data-page');
		var sessionKey = 'furni-admin-session-v1';
		var allowedEmail = 'admin@furni.com';
		var allowedPassword = 'Furni2026!';
		var session = readSession();

		window.__furniAdminSession = session;

		if (page === 'dashboard' && !session) {
			window.location.replace('login.html?redirect=dashboard.html');
			return;
		}

		if (page === 'login' && session) {
			window.location.replace(getRedirectTarget());
			return;
		}

		var loginForm = document.querySelector('[data-login-form]');
		var loginFeedback = document.querySelector('[data-login-feedback]');
		if (loginForm) {
			loginForm.addEventListener('submit', function(event) {
				event.preventDefault();

				var email = loginForm.elements.email.value.trim().toLowerCase();
				var password = loginForm.elements.password.value;

				if (email === allowedEmail && password === allowedPassword) {
					try {
						var payload = {
							email: allowedEmail,
							name: 'Furni Admin',
							loggedInAt: new Date().toISOString()
						};
						window.localStorage.setItem(sessionKey, JSON.stringify(payload));
						window.__furniAdminSession = payload;
						window.location.href = getRedirectTarget();
					} catch (error) {
						showFeedback('Impossible de creer la session locale sur ce navigateur.', true);
					}
					return;
				}

				showFeedback('Identifiants invalides. Utilisez admin@furni.com et Furni2026!.', true);
			});
		}

		document.querySelectorAll('[data-admin-email]').forEach(function(node) {
			node.textContent = session ? session.email : allowedEmail;
		});

		document.querySelectorAll('[data-admin-name]').forEach(function(node) {
			node.textContent = session ? session.name : 'Furni Admin';
		});

		document.querySelectorAll('[data-admin-logout]').forEach(function(trigger) {
			trigger.addEventListener('click', function(event) {
				event.preventDefault();
				try {
					window.localStorage.removeItem(sessionKey);
				} catch (error) {
					console.warn('Unable to clear admin session.', error);
				}
				window.__furniAdminSession = null;
				window.location.href = 'login.html';
			});
		});

		function showFeedback(message, isError) {
			if (!loginFeedback) {
				return;
			}

			loginFeedback.textContent = message;
			loginFeedback.classList.toggle('is-error', !!isError);
			loginFeedback.classList.toggle('is-success', !isError);
		}

		function readSession() {
			try {
				var rawSession = window.localStorage.getItem(sessionKey);
				if (!rawSession) {
					return null;
				}

				var parsedSession = JSON.parse(rawSession);
				return parsedSession && parsedSession.email ? parsedSession : null;
			} catch (error) {
				return null;
			}
		}

		function getRedirectTarget() {
			var searchParams = new URLSearchParams(window.location.search);
			var redirect = searchParams.get('redirect');

			if (!redirect) {
				return 'dashboard.html';
			}

			if (/^(?:[a-z]+:)?\/\//i.test(redirect) || redirect.indexOf('..') !== -1) {
				return 'dashboard.html';
			}

			return redirect;
		}
	};
	adminAuth();

	var adminDashboard = function() {
		var adminRoot = document.querySelector('[data-admin-dashboard]');

		if (!adminRoot || !window.__furniAdminSession) {
			return;
		}

		var storageKey = 'furni-admin-dashboard-v1';
		var activeOrderFilter = 'all';
		var state = getInitialState();
		var resourceConfigs = {
			services: {
				formId: 'service-form',
				tableBodyId: 'services-table-body',
				countLabel: 'services',
				emptyMessage: 'Aucun service disponible pour le moment.',
				fields: ['id', 'title', 'category', 'price', 'summary', 'status'],
				newLabel: 'Nouveau service',
				editLabel: 'Edition service',
				renderRow: function(item) {
					return '' +
						'<tr>' +
							'<td class="admin-title-cell"><strong>' + escapeHtml(item.title) + '</strong><span>' + escapeHtml(item.summary) + '</span></td>' +
							'<td>' + escapeHtml(item.category) + '</td>' +
							'<td>' + escapeHtml(item.price) + '</td>' +
							'<td>' + renderStatus(item.status) + '</td>' +
							'<td>' + renderActions('services', item.id) + '</td>' +
						'</tr>';
				}
			},
			products: {
				formId: 'product-form',
				tableBodyId: 'products-table-body',
				countLabel: 'products',
				emptyMessage: 'Aucun produit dans le catalogue.',
				fields: ['id', 'name', 'sku', 'category', 'price', 'stock', 'description', 'status'],
				newLabel: 'Nouveau produit',
				editLabel: 'Edition produit',
				renderRow: function(item) {
					return '' +
						'<tr>' +
							'<td class="admin-title-cell"><strong>' + escapeHtml(item.name) + '</strong><span>' + escapeHtml(item.description) + '</span></td>' +
							'<td>' + escapeHtml(item.sku) + '</td>' +
							'<td>' + escapeHtml(item.price) + '</td>' +
							'<td>' + escapeHtml(String(item.stock)) + '</td>' +
							'<td>' + renderStatus(item.status) + '</td>' +
							'<td>' + renderActions('products', item.id) + '</td>' +
						'</tr>';
				}
			},
			posts: {
				formId: 'post-form',
				tableBodyId: 'posts-table-body',
				countLabel: 'posts',
				emptyMessage: 'Aucun article de blog enregistre.',
				fields: ['id', 'title', 'category', 'author', 'date', 'readTime', 'excerpt', 'status'],
				newLabel: 'Nouveau post',
				editLabel: 'Edition post',
				renderRow: function(item) {
					return '' +
						'<tr>' +
							'<td class="admin-title-cell"><strong>' + escapeHtml(item.title) + '</strong><span>' + escapeHtml(item.excerpt) + '</span></td>' +
							'<td>' + escapeHtml(item.category) + '</td>' +
							'<td>' + escapeHtml(item.author) + '</td>' +
							'<td>' + escapeHtml(formatDate(item.date)) + '</td>' +
							'<td>' + renderStatus(item.status) + '</td>' +
							'<td>' + renderActions('posts', item.id) + '</td>' +
						'</tr>';
				}
			}
		};

		Object.keys(resourceConfigs).forEach(bindResourceForm);
		adminRoot.addEventListener('click', handleAdminClick);
		window.addEventListener('hashchange', activateTabFromHash);
		renderAll();
		activateTabFromHash();

		function bindResourceForm(resource) {
			var config = resourceConfigs[resource];
			var form = document.getElementById(config.formId);

			if (!form) {
				return;
			}

			form.addEventListener('submit', function(event) {
				event.preventDefault();

				var formData = new FormData(form);
				var payload = {};

				config.fields.forEach(function(field) {
					var rawValue = formData.get(field);
					payload[field] = typeof rawValue === 'string' ? rawValue.trim() : rawValue;
				});

				if (resource === 'products') {
					payload.stock = payload.stock === '' ? '0' : payload.stock;
				}

				if (payload.id) {
					state[resource] = state[resource].map(function(item) {
						return item.id === payload.id ? payload : item;
					});
				} else {
					payload.id = createId(resource);
					state[resource].unshift(payload);
				}

				persistState();
				renderAll();
				resetForm(resource);
			});

			var resetTrigger = document.querySelector('[data-reset-form="' + resource + '"]');
			if (resetTrigger) {
				resetTrigger.addEventListener('click', function() {
					resetForm(resource);
				});
			}
		}

		function handleAdminClick(event) {
			var actionButton = event.target.closest('[data-action]');
			if (actionButton) {
				var action = actionButton.getAttribute('data-action');
				var resource = actionButton.getAttribute('data-resource');
				var id = actionButton.getAttribute('data-id');

				if (action === 'edit') {
					populateForm(resource, id);
				}

				if (action === 'delete') {
					deleteItem(resource, id);
				}
			}

			var filterButton = event.target.closest('[data-order-filter]');
			if (filterButton) {
				activeOrderFilter = filterButton.getAttribute('data-order-filter');
				renderOrders();
			}
		}

		function populateForm(resource, id) {
			var config = resourceConfigs[resource];
			var form = document.getElementById(config.formId);
			var item = state[resource].find(function(entry) {
				return entry.id === id;
			});

			if (!form || !item) {
				return;
			}

			config.fields.forEach(function(field) {
				if (form.elements[field]) {
					form.elements[field].value = item[field] || '';
				}
			});

			updateFormState(resource, true);
			form.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}

		function deleteItem(resource, id) {
			var labels = {
				services: 'ce service',
				products: 'ce produit',
				posts: 'cet article'
			};

			if (!window.confirm('Supprimer ' + labels[resource] + ' ?')) {
				return;
			}

			state[resource] = state[resource].filter(function(item) {
				return item.id !== id;
			});

			persistState();
			renderAll();
			resetForm(resource);
		}

		function resetForm(resource) {
			var config = resourceConfigs[resource];
			var form = document.getElementById(config.formId);

			if (!form) {
				return;
			}

			form.reset();

			if (form.elements.id) {
				form.elements.id.value = '';
			}

			updateFormState(resource, false);
		}

		function updateFormState(resource, isEditing) {
			var config = resourceConfigs[resource];
			var modeLabel = document.querySelector('[data-form-mode-label="' + resource + '"]');
			var submitButton = document.querySelector('[data-form-submit="' + resource + '"]');

			if (modeLabel) {
				modeLabel.textContent = isEditing ? config.editLabel : config.newLabel;
			}

			if (submitButton) {
				submitButton.textContent = isEditing ? 'Mettre a jour' : 'Enregistrer';
			}
		}

		function renderAll() {
			renderResource('services');
			renderResource('products');
			renderResource('posts');
			renderOrders();
			renderStats();
			renderOrderKpis();
		}

		function activateTabFromHash() {
			var hash = window.location.hash;

			if (!hash || typeof bootstrap === 'undefined' || !bootstrap.Tab) {
				return;
			}

			var tabTrigger = document.querySelector('[data-bs-target="' + hash + '"]');

			if (!tabTrigger) {
				return;
			}

			bootstrap.Tab.getOrCreateInstance(tabTrigger).show();
		}

		function renderResource(resource) {
			var config = resourceConfigs[resource];
			var tbody = document.getElementById(config.tableBodyId);
			var items = state[resource] || [];

			if (!tbody) {
				return;
			}

			if (!items.length) {
				tbody.innerHTML = '<tr class="admin-empty-row"><td colspan="6">' + config.emptyMessage + '</td></tr>';
			} else {
				tbody.innerHTML = items.map(config.renderRow).join('');
			}

			updateCountLabel(config.countLabel, items.length);
		}

		function renderOrders() {
			var tbody = document.getElementById('orders-table-body');
			var orders = (state.orders || []).filter(function(order) {
				return activeOrderFilter === 'all' ? true : order.status === activeOrderFilter;
			});

			document.querySelectorAll('[data-order-filter]').forEach(function(button) {
				button.classList.toggle('active', button.getAttribute('data-order-filter') === activeOrderFilter);
			});

			if (!tbody) {
				return;
			}

			if (!orders.length) {
				tbody.innerHTML = '<tr class="admin-empty-row"><td colspan="6">Aucune commande pour ce filtre.</td></tr>';
				return;
			}

			tbody.innerHTML = orders.map(function(order) {
				return '' +
					'<tr>' +
						'<td class="admin-title-cell"><strong>' + escapeHtml(order.reference) + '</strong><span>' + escapeHtml(order.items) + '</span></td>' +
						'<td>' + escapeHtml(order.customer) + '</td>' +
						'<td>' + escapeHtml(formatDate(order.date)) + '</td>' +
						'<td>' + escapeHtml(order.amount) + '</td>' +
						'<td>' + escapeHtml(order.payment) + '</td>' +
						'<td>' + renderStatus(order.status) + '</td>' +
					'</tr>';
			}).join('');
		}

		function renderStats() {
			setStat('services', state.services.filter(function(item) {
				return item.status === 'Publie';
			}).length);

			setStat('products', state.products.filter(function(item) {
				return item.status === 'En ligne';
			}).length);

			setStat('posts', state.posts.filter(function(item) {
				return item.status === 'Publie';
			}).length);

			setStat('pendingOrders', state.orders.filter(function(order) {
				return order.status === 'En attente' || order.status === 'Preparation' || order.status === 'Expediee';
			}).length);
		}

		function renderOrderKpis() {
			document.querySelectorAll('[data-order-kpi]').forEach(function(node) {
				var status = node.getAttribute('data-order-kpi');
				var total = state.orders.filter(function(order) {
					return order.status === status;
				}).length;
				node.textContent = total;
			});
		}

		function updateCountLabel(resource, total) {
			var label = document.querySelector('[data-count-label="' + resource + '"]');
			if (label) {
				label.textContent = total + (total > 1 ? ' elements' : ' element');
			}
		}

		function setStat(name, value) {
			document.querySelectorAll('[data-stat="' + name + '"]').forEach(function(node) {
				node.textContent = value;
			});
		}

		function renderActions(resource, id) {
			return '' +
				'<div class="admin-actions">' +
					'<button type="button" class="admin-action-btn" data-action="edit" data-resource="' + resource + '" data-id="' + id + '">Editer</button>' +
					'<button type="button" class="admin-action-btn delete" data-action="delete" data-resource="' + resource + '" data-id="' + id + '">Supprimer</button>' +
				'</div>';
		}

		function renderStatus(status) {
			return '<span class="status-pill ' + escapeHtml(statusClassName(status)) + '">' + escapeHtml(status) + '</span>';
		}

		function statusClassName(value) {
			return String(value || '')
				.toLowerCase()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.replace(/\s+/g, '-');
		}

		function createId(prefix) {
			return prefix + '-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
		}

		function formatDate(value) {
			if (!value) {
				return '';
			}

			var date = new Date(value);
			if (Number.isNaN(date.getTime())) {
				return value;
			}

			return new Intl.DateTimeFormat('fr-FR', {
				day: '2-digit',
				month: 'short',
				year: 'numeric'
			}).format(date);
		}

		function escapeHtml(value) {
			return String(value == null ? '' : value)
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/"/g, '&quot;')
				.replace(/'/g, '&#39;');
		}

		function persistState() {
			try {
				window.localStorage.setItem(storageKey, JSON.stringify(state));
			} catch (error) {
				console.warn('Unable to persist admin dashboard data.', error);
			}
		}

		function getInitialState() {
			var fallbackState = getDefaultState();

			try {
				var storedValue = window.localStorage.getItem(storageKey);
				if (!storedValue) {
					return fallbackState;
				}

				var parsedValue = JSON.parse(storedValue);

				return {
					services: Array.isArray(parsedValue.services) ? parsedValue.services : fallbackState.services,
					products: Array.isArray(parsedValue.products) ? parsedValue.products : fallbackState.products,
					posts: Array.isArray(parsedValue.posts) ? parsedValue.posts : fallbackState.posts,
					orders: Array.isArray(parsedValue.orders) ? parsedValue.orders : fallbackState.orders
				};
			} catch (error) {
				return fallbackState;
			}
		}

		function getDefaultState() {
			return {
				services: [
					{
						id: 'services-1',
						title: 'Interior Styling',
						category: 'Conseil',
						price: 'A partir de 120 EUR',
						summary: 'Direction artistique pour harmoniser salon, chambre et coin bureau.',
						status: 'Publie'
					},
					{
						id: 'services-2',
						title: 'Furniture Assembly',
						category: 'Installation',
						price: 'Forfait 60 EUR',
						summary: 'Montage sur site avec installation propre et verification finale.',
						status: 'Publie'
					},
					{
						id: 'services-3',
						title: 'Bespoke Sourcing',
						category: 'Sur mesure',
						price: 'Sur devis',
						summary: 'Recherche de pieces specifiques pour projets residence et hospitality.',
						status: 'Brouillon'
					}
				],
				products: [
					{
						id: 'products-1',
						name: 'Nordic Chair',
						sku: 'FRN-CHAIR-01',
						category: 'Chaises',
						price: '$50.00',
						stock: '18',
						description: 'Chaise iconique en bois clair pour interieur minimal.',
						status: 'En ligne'
					},
					{
						id: 'products-2',
						name: 'Kruzo Aero Chair',
						sku: 'FRN-CHAIR-02',
						category: 'Chaises',
						price: '$78.00',
						stock: '8',
						description: 'Assise plus enveloppante pour salon ou bureau creatif.',
						status: 'En ligne'
					},
					{
						id: 'products-3',
						name: 'Ergonomic Chair',
						sku: 'FRN-OFFICE-09',
						category: 'Bureaux',
						price: '$43.00',
						stock: '0',
						description: 'Siege compact pense pour les espaces de travail domestiques.',
						status: 'Rupture'
					},
					{
						id: 'products-4',
						name: 'Modern Lounge Sofa',
						sku: 'FRN-SOFA-03',
						category: 'Canapes',
						price: '$299.00',
						stock: '5',
						description: 'Canape bas avec ligne contemporaine et tissu texturise.',
						status: 'Brouillon'
					}
				],
				posts: [
					{
						id: 'posts-1',
						title: '5 idees pour un salon plus calme',
						category: 'Inspiration',
						author: 'Equipe contenu',
						date: '2026-04-08',
						readTime: '5 min',
						excerpt: 'Un guide rapide pour construire une ambiance douce avec peu de pieces.',
						status: 'Publie'
					},
					{
						id: 'posts-2',
						title: 'Comment choisir la bonne chaise de salle a manger',
						category: 'Conseils',
						author: 'Mariam Ndiaye',
						date: '2026-04-12',
						readTime: '7 min',
						excerpt: 'Dimensions, matieres et rythmes visuels pour composer une table equilibree.',
						status: 'Planifie'
					},
					{
						id: 'posts-3',
						title: 'Les finitions bois a mettre en avant cette saison',
						category: 'Tendances',
						author: 'Studio Furni',
						date: '2026-03-28',
						readTime: '4 min',
						excerpt: 'Selection de tons chauds pour relier mobilier, textile et accessoires.',
						status: 'Brouillon'
					}
				],
				orders: [
					{
						reference: '#FRN-2048',
						customer: 'Awa Seck',
						date: '2026-04-10',
						amount: '$188.00',
						payment: 'Carte',
						status: 'En attente',
						items: 'Nordic Chair x2'
					},
					{
						reference: '#FRN-2045',
						customer: 'Ibrahima Fall',
						date: '2026-04-09',
						amount: '$299.00',
						payment: 'Mobile Money',
						status: 'Preparation',
						items: 'Modern Lounge Sofa x1'
					},
					{
						reference: '#FRN-2039',
						customer: 'Sarah Watson',
						date: '2026-04-08',
						amount: '$156.00',
						payment: 'Carte',
						status: 'Expediee',
						items: 'Kruzo Aero Chair x2'
					},
					{
						reference: '#FRN-2032',
						customer: 'Ndeye Kane',
						date: '2026-04-05',
						amount: '$50.00',
						payment: 'Carte',
						status: 'Livree',
						items: 'Nordic Chair x1'
					},
					{
						reference: '#FRN-2024',
						customer: 'David Morel',
						date: '2026-04-02',
						amount: '$412.00',
						payment: 'Virement',
						status: 'Livree',
						items: 'Dining Set x1'
					}
				]
			};
		}
	};
	adminDashboard();

})()
