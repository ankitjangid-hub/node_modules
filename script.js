/**
 * WoodCraft Furniture Workshop - Core Script
 * Comprehensive Interactive Features: Catalog, Price Manager / Live Price Customizer,
 * Dynamic Budget Estimator, Customer Offer Modal, and WhatsApp Lead Flow
 */

// ---------------------------------------------------------------
// ADMIN MODE: Edit Prices button is ONLY shown to the website owner.
// Customers will NEVER see it.
// To access admin mode, open the site with ?admin=1 in the URL:
//   e.g. index.html?admin=1
// ---------------------------------------------------------------
const IS_ADMIN = new URLSearchParams(window.location.search).get('admin') === '1';

// Default Master Configuration
const DEFAULT_CONFIG = {
    phone: '+919001116775',
    whatsappNumber: '919001116775',
    workshopName: 'WoodCraft Furniture Workshop',
    location: 'Plot 42, Artisan Industrial Area, Jaipur, Rajasthan',
    email: 'orders@woodcraftworkshop.com'
};

let WORKSHOP_CONFIG = { ...DEFAULT_CONFIG };

// Master Furniture Catalog Defaults
const DEFAULT_PRODUCTS = [
    {
        id: 'teak-bed-01',
        name: 'Solid Wood Heritage Bed',
        category: 'bedroom',
        priceRange: 'Starting @ ₹12,999',
        priceVal: 12999,
        badge: 'Best Value',
        wood: 'Solid Sheesham / Teak / Ply Options',
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
        desc: 'Customizable bed frame with optional hydraulic or box storage. Made in your choice of wood to match your exact budget.',
        dimensions: 'Single (36x75) / Queen (60x78) / King (72x78)',
        warranty: '10 Years Termite & Structural',
        finish: 'Natural Honey Matt or Glossy PU'
    },
    {
        id: 'dining-walnut-02',
        name: '4 & 6-Seater Solid Dining Set',
        category: 'dining',
        priceRange: 'Starting @ ₹14,500',
        priceVal: 14500,
        badge: 'Factory Price',
        wood: 'Hardwood / Sheesham / Teak',
        image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1000&q=80',
        desc: 'Sturdy solid wooden dining table with 4 or 6 cushioned chairs. Size and wood can be altered to fit any budget.',
        dimensions: '4-Seater (48"x36") / 6-Seater (72"x36")',
        warranty: '10 Years Warranty',
        finish: 'Water-repellent PU Coating'
    },
    {
        id: 'sofa-sheesham-03',
        name: 'Comfort Crafted Wooden Sofa Set',
        category: 'living',
        priceRange: 'Starting @ ₹13,499',
        priceVal: 13499,
        badge: 'Lowest Price',
        wood: 'Seasoned Hardwood & High Density Foam',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
        desc: 'Custom 3-seater, 3+1+1, or L-shape sectional with high-grade fabric or leatherette upholstery built to your budget.',
        dimensions: '3-Seater: 76", 1-Seater: 34", L-Shape: 8ft x 6ft',
        warranty: '10 Years Frame Guarantee',
        finish: 'Walnut Stain + Premium Fabric'
    },
    {
        id: 'wardrobe-modular-04',
        name: '2 / 3 / 4-Door Custom Wardrobe',
        category: 'bedroom',
        priceRange: 'Starting @ ₹11,999',
        priceVal: 11999,
        badge: 'Custom Sizes',
        wood: 'Engineered Hardwood / Marine Ply / Teak',
        image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80',
        desc: 'Internal layout built to your exact wall dimensions with clothes hangers, locks, drawers, and customizable mirror doors.',
        dimensions: '6ft x 3ft / 7ft x 4ft / 8ft x 6ft Custom',
        warranty: '10 Years Anti-Termite',
        finish: 'Laminate / Melamine / Teak Polish'
    },
    {
        id: 'desk-office-05',
        name: 'Compact Study & Work Desk',
        category: 'office',
        priceRange: 'Starting @ ₹4,999',
        priceVal: 4999,
        badge: 'Budget Friendly',
        wood: 'Solid Hardwood / Engineered Board',
        image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80',
        desc: 'Clean, modern home office desk with utility drawer and wire management. High quality finish at affordable direct pricing.',
        dimensions: '36"x20" / 48"x24" / Custom',
        warranty: '5 Years Warranty',
        finish: 'Natural Honey / Walnut'
    },
    {
        id: 'chair-armchair-06',
        name: 'Solid Wood Accent & Lounge Chair',
        category: 'living',
        priceRange: 'Starting @ ₹3,499',
        priceVal: 3499,
        badge: 'Super Low',
        wood: 'Hardwood / Natural Teak Frame',
        image: 'https://images.unsplash.com/photo-1580481077111-20a233b827e8?auto=format&fit=crop&w=1000&q=80',
        desc: 'Ergonomic wooden armchair with comfortable padded seat. Ideal for balcony, bedroom corner, or living room lounge.',
        dimensions: '26" W x 28" D x 32" H',
        warranty: '5 Years Warranty',
        finish: 'Satin Teak / Walnut'
    },
    {
        id: 'mandir-temple-07',
        name: 'Handcrafted Wooden Home Mandir',
        category: 'custom',
        priceRange: 'Starting @ ₹6,999',
        priceVal: 6999,
        badge: 'Artisan Crafted',
        wood: 'Seasoned Sheesham / Teak',
        image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1000&q=80',
        desc: 'Beautiful temple dome with pull-out bhog tray, diya drawer, and brass knobs. Sized according to your pooja room.',
        dimensions: '2.5ft / 3.5ft / 5ft Height Available',
        warranty: 'Lifetime Wood Guarantee',
        finish: 'Gloss Amber / Heritage Brown'
    },
    {
        id: 'coffee-table-08',
        name: 'Modern Center Coffee & Side Table',
        category: 'living',
        priceRange: 'Starting @ ₹2,999',
        priceVal: 2999,
        badge: 'Best Deal',
        wood: 'Solid Wood & Sturdy Frame',
        image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1000&q=80',
        desc: 'Compact round or rectangular coffee table with water-resistant finish and smooth rounded edges.',
        dimensions: '30" Dia / 36" x 20" Rectangular',
        warranty: '5 Years Warranty',
        finish: 'Rustic Wax / PU Coat'
    },
    {
        id: 'tv-unit-09',
        name: 'Sleek Wooden TV Entertainment Unit',
        category: 'living',
        priceRange: 'Starting @ ₹5,499',
        priceVal: 5499,
        badge: 'Trending',
        wood: 'Hardwood / Ply + Laminate',
        image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80',
        desc: 'Wall-mounted or floor-standing TV cabinet with cable pass-through, set-top box shelves, and storage drawers.',
        dimensions: '4ft / 5ft / 6ft Width Options',
        warranty: '7 Years Warranty',
        finish: 'Dual Tone Walnut & White'
    },
    {
        id: 'shoe-rack-10',
        name: 'Wooden Shoe Rack & Entry Cabinet',
        category: 'custom',
        priceRange: 'Starting @ ₹3,299',
        priceVal: 3299,
        badge: 'Economical',
        wood: 'Engineered Board / Seasoned Wood',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
        desc: 'Multi-tier shoe rack with louvered ventilation doors to prevent odor. Cushion seating top option available.',
        dimensions: '30" W x 14" D x 36" H',
        warranty: '5 Years Warranty',
        finish: 'Natural Wood Grain Finish'
    }
];

// Active Runtime Products (Loaded from localStorage if edited by user)
let PRODUCTS_DATA = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));

// Base Estimator Rates Defaults
const DEFAULT_ESTIMATOR_BASE = {
    bed: { base: 11999, name: 'Solid Bed Frame', days: '7 - 10 Days' },
    sofa: { base: 12499, name: 'Comfort Sofa Set', days: '8 - 12 Days' },
    dining: { base: 13500, name: 'Dining Table & Chairs', days: '7 - 10 Days' },
    wardrobe: { base: 11999, name: 'Custom Wardrobe Unit', days: '10 - 14 Days' },
    desk: { base: 4999, name: 'Study & Office Desk', days: '5 - 7 Days' },
    cabinet: { base: 5499, name: 'TV Cabinet / Storage Unit', days: '5 - 8 Days' }
};

let BASE_PRICES = JSON.parse(JSON.stringify(DEFAULT_ESTIMATOR_BASE));

// Document Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
    loadSavedCustomPrices();
    initNavigation();
    initProductCatalog();
    initEstimator();
    initBudgetMatcher();
    initModals();
    initPriceEditorModal();
    initFAQ();
    initConsultationForm();
    initScrollEffects();
    initAdminPage();

    // ---- Admin Guard: Only show Edit Prices UI to owner (when ?admin=1) ----
    // All elements with class .admin-only are hidden by default via CSS.
    // This script reveals them ONLY for the site owner.
    if (IS_ADMIN) {
        document.querySelectorAll('.admin-only').forEach(el => {
            el.style.display = '';
        });
    }
    // Always hide admin elements unless in admin mode (safety net for CSS failures)
    if (!IS_ADMIN) {
        document.querySelectorAll('.admin-only').forEach(el => {
            el.style.display = 'none';
        });
    }
});


/* --- Load & Save Custom Prices (Persistence) --- */
function loadSavedCustomPrices() {
    try {
        const savedProducts = localStorage.getItem('woodcraft_custom_products');
        const savedPhone = localStorage.getItem('woodcraft_custom_phone');
        if (savedProducts) {
            const parsed = JSON.parse(savedProducts);
            if (Array.isArray(parsed) && parsed.length > 0) {
                PRODUCTS_DATA = parsed;
                // Sync estimator bases with item prices
                const bedItem = PRODUCTS_DATA.find(p => p.id === 'teak-bed-01');
                if (bedItem) BASE_PRICES.bed.base = bedItem.priceVal;

                const sofaItem = PRODUCTS_DATA.find(p => p.id === 'sofa-sheesham-03');
                if (sofaItem) BASE_PRICES.sofa.base = sofaItem.priceVal;

                const diningItem = PRODUCTS_DATA.find(p => p.id === 'dining-walnut-02');
                if (diningItem) BASE_PRICES.dining.base = diningItem.priceVal;

                const wardrobeItem = PRODUCTS_DATA.find(p => p.id === 'wardrobe-modular-04');
                if (wardrobeItem) BASE_PRICES.wardrobe.base = wardrobeItem.priceVal;

                const deskItem = PRODUCTS_DATA.find(p => p.id === 'desk-office-05');
                if (deskItem) BASE_PRICES.desk.base = deskItem.priceVal;

                const cabItem = PRODUCTS_DATA.find(p => p.id === 'tv-unit-09');
                if (cabItem) BASE_PRICES.cabinet.base = cabItem.priceVal;
            }
        }
        if (savedPhone) {
            WORKSHOP_CONFIG.whatsappNumber = savedPhone.replace(/\D/g, '');
            WORKSHOP_CONFIG.phone = savedPhone;
        }
    } catch (e) {
        console.warn('Could not load custom prices from storage', e);
    }
}

/* --- Price Manager Editor Modal (Header Button Feature) --- */
function initPriceEditorModal() {
    window.openPriceEditorModal = function() {
        let editorModal = document.getElementById('priceEditorModal');
        if (!editorModal) {
            createPriceEditorModalDOM();
            editorModal = document.getElementById('priceEditorModal');
        }
        populatePriceEditorTable();
        editorModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closePriceEditorModal = function() {
        const editorModal = document.getElementById('priceEditorModal');
        if (editorModal) {
            editorModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    window.saveCustomPricesFromEditor = function() {
        const inputs = document.querySelectorAll('.price-edit-item-input');
        inputs.forEach(input => {
            const prodId = input.getAttribute('data-id');
            const newPrice = parseInt(input.value, 10);
            if (!isNaN(newPrice) && newPrice > 0) {
                const prod = PRODUCTS_DATA.find(p => p.id === prodId);
                if (prod) {
                    prod.priceVal = newPrice;
                    prod.priceRange = `Starting @ ₹${newPrice.toLocaleString('en-IN')}`;
                }
            }
        });

        const phoneInput = document.getElementById('editorPhoneInput');
        if (phoneInput && phoneInput.value.trim()) {
            const rawPhone = phoneInput.value.trim();
            WORKSHOP_CONFIG.phone = rawPhone;
            WORKSHOP_CONFIG.whatsappNumber = rawPhone.replace(/\D/g, '');
            localStorage.setItem('woodcraft_custom_phone', rawPhone);
        }

        localStorage.setItem('woodcraft_custom_products', JSON.stringify(PRODUCTS_DATA));

        // Re-sync and re-render everywhere live!
        loadSavedCustomPrices();
        initProductCatalog();
        if (typeof window.recalcEstimator === 'function') {
            window.recalcEstimator();
        }
        closePriceEditorModal();
        showToast('All Prices and WhatsApp Details updated live!');
    };

    window.resetDefaultPrices = function() {
        if (confirm('Reset all product prices and WhatsApp number back to default factory settings?')) {
            localStorage.removeItem('woodcraft_custom_products');
            localStorage.removeItem('woodcraft_custom_phone');
            PRODUCTS_DATA = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
            WORKSHOP_CONFIG = { ...DEFAULT_CONFIG };
            loadSavedCustomPrices();
            initProductCatalog();
            populatePriceEditorTable();
            if (typeof window.recalcEstimator === 'function') {
                window.recalcEstimator();
            }
            closePriceEditorModal();
            showToast('Reset back to default workshop prices!');
        }
    };
}

function createPriceEditorModalDOM() {
    const modalDiv = document.createElement('div');
    modalDiv.id = 'priceEditorModal';
    modalDiv.className = 'modal-overlay';
    modalDiv.innerHTML = `
        <div class="price-editor-modal-container">
            <div class="editor-modal-header">
                <div>
                    <h3 style="font-size: 1.5rem; color: #fff; margin-bottom: 4px;">
                        <i class="fa-solid fa-pen-to-square" style="color: var(--wood-light-amber);"></i> Edit Furniture Prices &amp; Settings
                    </h3>
                    <p style="color: #cbbab0; font-size: 0.85rem; margin: 0;">Change prices live for your website without touching any code.</p>
                </div>
                <button class="modal-close-btn" onclick="closePriceEditorModal()" style="color: #fff; background: rgba(255,255,255,0.15);">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div class="editor-modal-body">
                <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 20px; background: var(--surface-card-subtle); padding: 16px 20px; border-radius: var(--radius-md); border: 1px solid var(--surface-border);">
                    <div style="flex: 1; min-width: 240px;">
                        <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px; color: var(--wood-dark);">WhatsApp Number for Inquiries:</label>
                        <input type="text" id="editorPhoneInput" class="form-control" value="${WORKSHOP_CONFIG.phone}" placeholder="+919876543210">
                    </div>
                    <div style="display: flex; align-items: flex-end;">
                        <span style="font-size: 0.82rem; color: var(--text-muted);">Changes save instantly in your browser.</span>
                    </div>
                </div>

                <h4 style="font-size: 1.1rem; color: var(--wood-darkest); margin-bottom: 10px;">Collection Starting Prices (in INR ₹):</h4>
                <div style="overflow-x: auto;">
                    <table class="editor-table">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Category</th>
                                <th>Current Wood</th>
                                <th>Starting Price (₹)</th>
                            </tr>
                        </thead>
                        <tbody id="priceEditorTableBody">
                            <!-- Populated dynamically -->
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="editor-modal-footer">
                <button type="button" class="btn btn-secondary btn-sm" onclick="resetDefaultPrices()">
                    <i class="fa-solid fa-rotate-left"></i> Reset Defaults
                </button>
                <div style="display: flex; gap: 10px;">
                    <button type="button" class="btn btn-secondary btn-sm" onclick="closePriceEditorModal()">Cancel</button>
                    <button type="button" class="btn btn-primary" onclick="saveCustomPricesFromEditor()">
                        <i class="fa-solid fa-check"></i> Save &amp; Apply Live Prices
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modalDiv);
}

function populatePriceEditorTable() {
    const tbody = document.getElementById('priceEditorTableBody');
    if (!tbody) return;
    tbody.innerHTML = PRODUCTS_DATA.map(p => `
        <tr>
            <td><strong>${p.name}</strong></td>
            <td><span style="text-transform: capitalize; font-size: 0.85rem; color: var(--wood-primary);">${p.category}</span></td>
            <td style="font-size: 0.85rem; color: var(--text-muted);">${p.wood.split('/')[0]}</td>
            <td>
                <div style="display: flex; align-items: center; gap: 6px;">
                    <span style="font-weight: 700; color: var(--wood-primary);">₹</span>
                    <input type="number" class="editor-input price-edit-item-input" data-id="${p.id}" value="${p.priceVal}" step="500" min="500">
                </div>
            </td>
        </tr>
    `).join('');
}

/* --- Customer Offer Modal ("Propose Custom Price") --- */
window.openCustomOfferModal = function(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    let offerModal = document.getElementById('customOfferModal');
    if (!offerModal) {
        createCustomOfferModalDOM();
        offerModal = document.getElementById('customOfferModal');
    }

    document.getElementById('offerProdName').textContent = product.name;
    document.getElementById('offerProdCurrent').textContent = product.priceRange;
    document.getElementById('offerTargetPrice').value = product.priceVal;
    document.getElementById('offerProdId').value = product.id;

    offerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

function createCustomOfferModalDOM() {
    const modalDiv = document.createElement('div');
    modalDiv.id = 'customOfferModal';
    modalDiv.className = 'modal-overlay';
    modalDiv.innerHTML = `
        <div style="background: #fff; border-radius: var(--radius-xl); max-width: 520px; width: 100%; padding: 35px; position: relative; box-shadow: var(--shadow-xl);">
            <button class="modal-close-btn" onclick="closeCustomOfferModal()">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <div style="text-align: center; margin-bottom: 20px;">
                <div class="section-tag" style="margin-bottom: 6px;"><i class="fa-solid fa-hand-holding-dollar"></i> Custom Price Request</div>
                <h3 style="font-size: 1.5rem; margin-bottom: 6px;" id="offerProdName">Product Title</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem;">Current Standard Rate: <strong id="offerProdCurrent" style="color: var(--wood-primary);">₹12,999</strong></p>
            </div>

            <form id="customOfferForm" onsubmit="handleCustomOfferSubmit(event)">
                <input type="hidden" id="offerProdId">
                <div class="form-group">
                    <label for="offerTargetPrice">What is your desired offer price? (₹) *</label>
                    <input type="number" id="offerTargetPrice" class="form-control" required style="font-size: 1.2rem; font-weight: 800; color: var(--wood-primary);">
                    <small style="color: var(--text-muted); font-size: 0.78rem;">We will customize internal timber/finish to match your exact offer price!</small>
                </div>
                <div class="form-group">
                    <label for="offerCustomerName">Your Name *</label>
                    <input type="text" id="offerCustomerName" class="form-control" placeholder="e.g. Priyanshu Sharma" required>
                </div>
                <div class="form-group">
                    <label for="offerCustomerNote">Dimensions / Notes (Optional)</label>
                    <input type="text" id="offerCustomerNote" class="form-control" placeholder="e.g. Queen size, Walnut finish, Jaipur delivery">
                </div>

                <button type="submit" class="btn btn-whatsapp btn-lg" style="width: 100%; margin-top: 10px;">
                    <i class="fa-brands fa-whatsapp"></i> Send My Custom Offer on WhatsApp
                </button>
            </form>
        </div>
    `;
    document.body.appendChild(modalDiv);
}

window.closeCustomOfferModal = function() {
    const offerModal = document.getElementById('customOfferModal');
    if (offerModal) {
        offerModal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

window.handleCustomOfferSubmit = function(e) {
    e.preventDefault();
    const prodId = document.getElementById('offerProdId').value;
    const prod = PRODUCTS_DATA.find(p => p.id === prodId) || { name: 'Custom Furniture' };
    const offerPrice = document.getElementById('offerTargetPrice').value;
    const custName = document.getElementById('offerCustomerName').value.trim() || 'Customer';
    const note = document.getElementById('offerCustomerNote').value.trim() || 'Standard specs';

    const msg = `Hello ${WORKSHOP_CONFIG.workshopName}, I am submitting a *Custom Price Offer*:%0A` +
                `• *Item:* ${prod.name}%0A` +
                `• *My Proposed Price:* ₹${Number(offerPrice).toLocaleString('en-IN')}%0A` +
                `• *Name:* ${custName}%0A` +
                `• *Notes/Size:* ${note}%0A%0A` +
                `Please confirm if you can build this piece at my offered price!`;

    showToast('Sending your custom offer to WhatsApp...');
    setTimeout(() => {
        window.open(`https://wa.me/${WORKSHOP_CONFIG.whatsappNumber}?text=${msg}`, '_blank');
        closeCustomOfferModal();
    }, 600);
};

/* --- Navigation & Mobile Drawer --- */
function initNavigation() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const drawerClose = document.getElementById('drawerClose');
    const navbar = document.querySelector('.navbar');

    function openDrawer() {
        if (mobileDrawer) mobileDrawer.classList.add('open');
        if (drawerOverlay) drawerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        if (mobileDrawer) mobileDrawer.classList.remove('open');
        if (drawerOverlay) drawerOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    document.querySelectorAll('.drawer-links a').forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 30) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav.nav-links a, .drawer-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/* --- Product Catalog Renderer with Category & Budget Filter --- */
function initProductCatalog() {
    const catalogContainer = document.getElementById('productCatalogGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('productSearchInput');
    const budgetFilterSelect = document.getElementById('productBudgetFilter');

    if (!catalogContainer) return;

    let activeFilter = 'all';
    let activeBudget = 'all';
    let searchQuery = '';

    function renderCatalog() {
        const filteredProducts = PRODUCTS_DATA.filter(item => {
            const matchesCategory = (activeFilter === 'all' || item.category === activeFilter);
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  item.wood.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  item.desc.toLowerCase().includes(searchQuery.toLowerCase());
            let matchesBudget = true;
            if (activeBudget === 'under5k') matchesBudget = item.priceVal <= 5000;
            else if (activeBudget === 'under10k') matchesBudget = item.priceVal <= 10000;
            else if (activeBudget === 'under15k') matchesBudget = item.priceVal <= 15000;
            else if (activeBudget === 'above15k') matchesBudget = item.priceVal > 15000;

            return matchesCategory && matchesSearch && matchesBudget;
        });

        if (filteredProducts.length === 0) {
            catalogContainer.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; background: #fff; border-radius: 16px; border: 1px dashed var(--surface-border);">
                    <i class="fa-solid fa-coins" style="font-size: 2.4rem; color: var(--wood-amber); margin-bottom: 12px;"></i>
                    <h3 style="font-size: 1.35rem; margin-bottom: 8px;">No furniture found in this exact filter</h3>
                    <p style="color: var(--text-muted); margin-bottom: 18px;">Tell us your target budget and we will build it custom for you!</p>
                    <button class="btn btn-primary" onclick="openCustomBudgetQuote()">Order Custom at My Budget</button>
                </div>
            `;
            return;
        }

        catalogContainer.innerHTML = filteredProducts.map(product => `
            <article class="product-card" data-category="${product.category}">
                <div class="card-media">
                    <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'">
                    <span class="card-badge">${product.badge}</span>
                    <span class="card-wood-tag"><i class="fa-solid fa-tag"></i> ${product.priceRange}</span>
                </div>
                <div class="card-body">
                    <h3 class="card-title">${product.name}</h3>
                    <p class="card-desc">${product.desc}</p>
                    <div class="card-specs-list">
                        <span class="card-spec-chip"><i class="fa-solid fa-tree"></i> ${product.wood.split('/')[0]}</span>
                        <span class="card-spec-chip"><i class="fa-solid fa-ruler"></i> Custom Sizing</span>
                        <span class="card-spec-chip" style="background: rgba(37,211,102,0.1); color: var(--success);"><i class="fa-solid fa-check"></i> Price Match</span>
                    </div>
                    <div class="card-footer">
                        <div class="card-price-block">
                            <span class="price-sub">Direct Workshop Rate</span>
                            <span class="price-val">${product.priceRange}</span>
                        </div>
                        <div class="card-buttons">
                            ${IS_ADMIN ? `<button class="btn btn-secondary btn-sm" onclick="openCustomOfferModal('${product.id}')" title="Edit / Offer Custom Price">
                                <i class="fa-solid fa-pen"></i> Edit Price
                            </button>` : ''}
                            <button class="btn btn-whatsapp btn-sm" onclick="openWhatsAppQuote('${product.name}', '${product.priceRange}')" title="Chat on WhatsApp">
                                <i class="fa-brands fa-whatsapp"></i> Inquire
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        `).join('');
    }


    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.getAttribute('data-filter') || 'all';
            renderCatalog();
        });
    });

    if (budgetFilterSelect) {
        budgetFilterSelect.addEventListener('change', (e) => {
            activeBudget = e.target.value;
            renderCatalog();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim();
            renderCatalog();
        });
    }

    renderCatalog();
}

/* --- Customer Budget Matcher Interactive Tool --- */
function initBudgetMatcher() {
    const budgetInput = document.getElementById('customBudgetInput');
    const budgetOutput = document.getElementById('customBudgetAdvice');
    const budgetWhatsAppBtn = document.getElementById('budgetWhatsAppBtn');

    if (!budgetInput || !budgetOutput) return;

    function evaluateBudget() {
        const amount = parseInt(budgetInput.value, 10) || 10000;
        let adviceHTML = '';
        let suggestedPlan = '';

        if (amount < 6000) {
            adviceHTML = `<strong>Budget Friendly Tier (₹${amount.toLocaleString('en-IN')}):</strong> Ideal for Coffee Tables, Accent Chairs, Wall TV Shelves, or Shoe Racks in seasoned engineered wood / hardwood with satin polish.`;
            suggestedPlan = 'Budget Tier (Under ₹6,000)';
        } else if (amount <= 15000) {
            adviceHTML = `<strong>Smart Value Tier (₹${amount.toLocaleString('en-IN')}):</strong> Perfect for Single/Queen Solid Wood Beds, 4-Seater Dining Sets, Executive Study Desks, or 3-Seater Sofas with 5-Year Warranty.`;
            suggestedPlan = 'Smart Value Tier (₹6,000 - ₹15,000)';
        } else if (amount <= 30000) {
            adviceHTML = `<strong>Premium Solid Timber Tier (₹${amount.toLocaleString('en-IN')}):</strong> Full 6-Seater Sheesham/Teak Dining Sets, King Size Hydraulic Storage Beds, Modular 3-Door Wardrobes, or Luxury Sofa Sets.`;
            suggestedPlan = 'Premium Solid Timber Tier (₹15,000 - ₹30,000)';
        } else {
            adviceHTML = `<strong>Luxury Bespoke Tier (₹${amount.toLocaleString('en-IN')}):</strong> 100% Pure CP Teak / American Walnut Live-Edge Dining Sets, Grand Master Bedroom Packages, or Full House Woodwork with Italian PU Polish.`;
            suggestedPlan = 'Bespoke Architectural Package (₹30,000+)';
        }

        budgetOutput.innerHTML = adviceHTML;

        if (budgetWhatsAppBtn) {
            const msg = `Hello ${WORKSHOP_CONFIG.workshopName}, I have a target budget of *₹${amount.toLocaleString('en-IN')}* for my furniture requirements (${suggestedPlan}). Please advise what designs and wood materials you can make within my exact budget.`;
            budgetWhatsAppBtn.href = `https://wa.me/${WORKSHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
        }
    }

    budgetInput.addEventListener('input', evaluateBudget);
    evaluateBudget();
}

/* --- Interactive Cost Estimator & WhatsApp Quote Builder --- */
function initEstimator() {
    const furnitureTypeBtns = document.querySelectorAll('.calc-type-btn');
    const woodSelect = document.getElementById('calcWood');
    const sizeSelect = document.getElementById('calcSize');
    const finishSelect = document.getElementById('calcFinish');
    const storageSelect = document.getElementById('calcStorage');
    const userBudgetInput = document.getElementById('calcCustomerBudget');

    const sumFurniture = document.getElementById('sumFurniture');
    const sumWood = document.getElementById('sumWood');
    const sumSize = document.getElementById('sumSize');
    const sumFinish = document.getElementById('sumFinish');
    const sumDuration = document.getElementById('sumDuration');
    const displayPrice = document.getElementById('calcDisplayPrice');
    const whatsappQuoteBtn = document.getElementById('calcWhatsAppBtn');

    if (!displayPrice) return;

    const WOOD_MULTIPLIERS = {
        economy: { factor: 0.85, name: 'Economy Seasoned Hardwood (Lowest Cost)' },
        plywood: { factor: 1.00, name: 'Marine Ply + Natural Veneer' },
        sheesham: { factor: 1.18, name: 'Indian Sheesham (Rosewood)' },
        teak: { factor: 1.35, name: 'CP Teak Wood (Sagwan)' },
        walnut: { factor: 1.45, name: 'American Walnut' },
        oak: { factor: 1.38, name: 'White Oak' }
    };

    const SIZE_MULTIPLIERS = {
        compact: { factor: 0.80, name: 'Compact / Small Room / 4-Seater' },
        standard: { factor: 1.00, name: 'Standard / 6-Seater / Queen' },
        large: { factor: 1.25, name: 'Grand King / 8-Seater' },
        custom: { factor: 1.10, name: 'Custom Dimensions' }
    };

    const FINISH_ADDONS = {
        matt: { cost: 0, name: 'Natural Satin Polish (Included Free)' },
        gloss: { cost: 1200, name: 'Glossy Clear PU Finish (+₹1,200)' },
        distressed: { cost: 1800, name: 'Rustic Vintage Stain (+₹1,800)' },
        epoxy: { cost: 3500, name: 'Epoxy Resin Accent (+₹3,500)' }
    };

    const STORAGE_ADDONS = {
        none: { cost: 0, name: 'Standard (No Storage)' },
        box: { cost: 1800, name: 'Manual Box Storage (+₹1,800)' },
        hydraulic: { cost: 3800, name: 'Hydraulic Lift-Up (+₹3,800)' }
    };

    let selectedType = 'bed';

    furnitureTypeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            furnitureTypeBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedType = btn.getAttribute('data-type') || 'bed';
            updateCalculation();
        });
    });

    [woodSelect, sizeSelect, finishSelect, storageSelect, userBudgetInput].forEach(elem => {
        if (elem) {
            elem.addEventListener('change', updateCalculation);
            elem.addEventListener('input', updateCalculation);
        }
    });

    function updateCalculation() {
        const typeData = BASE_PRICES[selectedType] || BASE_PRICES.bed;
        const woodKey = woodSelect ? woodSelect.value : 'plywood';
        const sizeKey = sizeSelect ? sizeSelect.value : 'standard';
        const finishKey = finishSelect ? finishSelect.value : 'matt';
        const storageKey = storageSelect ? storageSelect.value : 'none';
        const customBudgetVal = userBudgetInput ? userBudgetInput.value.trim() : '';

        const woodData = WOOD_MULTIPLIERS[woodKey] || WOOD_MULTIPLIERS.plywood;
        const sizeData = SIZE_MULTIPLIERS[sizeKey] || SIZE_MULTIPLIERS.standard;
        const finishData = FINISH_ADDONS[finishKey] || FINISH_ADDONS.matt;
        const storageData = STORAGE_ADDONS[storageKey] || STORAGE_ADDONS.none;

        const calculatedPrice = Math.round((typeData.base * woodData.factor * sizeData.factor) + finishData.cost + storageData.cost);
        const lowRange = Math.round(calculatedPrice * 0.94);
        const highRange = Math.round(calculatedPrice * 1.06);

        if (sumFurniture) sumFurniture.textContent = typeData.name;
        if (sumWood) sumWood.textContent = woodData.name.split('(')[0];
        if (sumSize) sumSize.textContent = sizeData.name.split('/')[0];
        if (sumFinish) sumFinish.textContent = finishData.name.split('(')[0];
        if (sumDuration) sumDuration.textContent = typeData.days;

        if (displayPrice) {
            displayPrice.textContent = `₹${lowRange.toLocaleString('en-IN')} - ₹${highRange.toLocaleString('en-IN')}`;
        }

        if (whatsappQuoteBtn) {
            let budgetText = customBudgetVal ? `• *My Target Budget:* ₹${customBudgetVal}%0A` : '';
            const message = `Hello ${WORKSHOP_CONFIG.workshopName}, I generated a custom estimate online:%0A` +
                            `• *Item:* ${typeData.name}%0A` +
                            `• *Wood Choice:* ${woodData.name}%0A` +
                            `• *Dimensions/Size:* ${sizeData.name}%0A` +
                            `• *Finish:* ${finishData.name}%0A` +
                            `• *Storage:* ${storageData.name}%0A` +
                            budgetText +
                            `• *Estimated Direct Rate:* ₹${lowRange.toLocaleString('en-IN')} - ₹${highRange.toLocaleString('en-IN')}%0A%0A` +
                            `Please confirm if this can be made within my budget and share design catalogue!`;

            whatsappQuoteBtn.href = `https://wa.me/${WORKSHOP_CONFIG.whatsappNumber}?text=${message}`;
        }
    }

    window.recalcEstimator = updateCalculation;
    updateCalculation();
}

/* --- Quick View Product Modal --- */
function initModals() {
    const modalOverlay = document.getElementById('productModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    if (!modalOverlay) return;

    window.showProductDetails = function(productId) {
        const product = PRODUCTS_DATA.find(p => p.id === productId);
        if (!product) return;

        document.getElementById('modalImage').src = product.image;
        document.getElementById('modalCategory').textContent = product.category.toUpperCase();
        document.getElementById('modalTitle').textContent = product.name;
        document.getElementById('modalDesc').textContent = product.desc;
        document.getElementById('modalWood').textContent = product.wood;
        document.getElementById('modalDimensions').textContent = product.dimensions;
        document.getElementById('modalWarranty').textContent = product.warranty;
        document.getElementById('modalFinish').textContent = product.finish;
        document.getElementById('modalPrice').textContent = product.priceRange + ' (Customizable to your price)';

        const modalWhatsApp = document.getElementById('modalWhatsAppBtn');
        if (modalWhatsApp) {
            const msg = `Hello ${WORKSHOP_CONFIG.workshopName}, I am interested in *${product.name}* (${product.priceRange}). I want to customize this according to my budget and room sizes.`;
            modalWhatsApp.href = `https://wa.me/${WORKSHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
        }

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            if (typeof window.closePriceEditorModal === 'function') window.closePriceEditorModal();
            if (typeof window.closeCustomOfferModal === 'function') window.closeCustomOfferModal();
        }
    });
}

/* --- FAQ Accordion --- */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

/* --- Consultation & Custom Inquiry Form --- */
function initConsultationForm() {
    const form = document.getElementById('consultationForm') || document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('custName')?.value.trim() || 'Client';
        const phone = document.getElementById('custPhone')?.value.trim() || 'Not specified';
        const furnitureType = document.getElementById('custFurniture')?.value || 'Custom Piece';
        const woodPreference = document.getElementById('custWood')?.value || 'Recommended Wood';
        const customBudget = document.getElementById('custBudget')?.value.trim() || 'Flexible / Direct Workshop Rate';
        const notes = document.getElementById('custNotes')?.value.trim() || 'No additional notes';

        const whatsappMessage = `*New Custom Furniture Order & Budget Request*%0A%0A` +
                                `👤 *Name:* ${encodeURIComponent(name)}%0A` +
                                `📞 *Phone:* ${encodeURIComponent(phone)}%0A` +
                                `🪑 *Furniture Needed:* ${encodeURIComponent(furnitureType)}%0A` +
                                `💰 *My Target Budget:* ${encodeURIComponent(customBudget)}%0A` +
                                `🌲 *Preferred Wood:* ${encodeURIComponent(woodPreference)}%0A` +
                                `📝 *Project Details / Sizes:* ${encodeURIComponent(notes)}%0A%0A` +
                                `Please share designs and material options that fit my budget.`;

        showToast('Connecting to WhatsApp with your customized quote details...');

        setTimeout(() => {
            window.open(`https://wa.me/${WORKSHOP_CONFIG.whatsappNumber}?text=${whatsappMessage}`, '_blank');
            form.reset();
        }, 800);
    });
}

/* --- WhatsApp Quick Opener Utility --- */
window.openWhatsAppQuote = function(productOrTopic, priceHint) {
    const priceText = priceHint ? ` (${priceHint})` : '';
    const msg = `Hello ${WORKSHOP_CONFIG.workshopName}, I am interested in *${productOrTopic}*${priceText}. I want to customize this according to my budget and room sizes. Please share available options.`;
    window.open(`https://wa.me/${WORKSHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
};

window.openCustomBudgetQuote = function() {
    const msg = `Hello ${WORKSHOP_CONFIG.workshopName}, I have a specific target budget for my furniture and would like to see what custom pieces you can build for me at direct workshop rates.`;
    window.open(`https://wa.me/${WORKSHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
};

/* --- Toast Feedback --- */
function showToast(message) {
    let toast = document.getElementById('globalToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'globalToast';
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-check-circle" style="color: var(--whatsapp-green);"></i> <span>${message}</span>`;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

/* --- Smooth Scrolling Utility --- */
function initScrollEffects() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.length <= 1) return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ==========================================================================
   ADMIN PAGE CONTROLLER (admin.html)
   Allows full catalog management: Adding items, deleting items, editing prices,
   and updating WhatsApp phone hotline.
   ========================================================================== */
function initAdminPage() {
    const adminTableBody = document.getElementById('adminProductsTableBody');
    if (!adminTableBody) return; // Not on admin page

    renderAdminTable();
    updateAdminStats();
}

function renderAdminTable() {
    const adminTableBody = document.getElementById('adminProductsTableBody');
    if (!adminTableBody) return;

    if (PRODUCTS_DATA.length === 0) {
        adminTableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 40px; color: var(--text-muted);">
                    No items in catalog. Use the form above to add your first furniture item!
                </td>
            </tr>
        `;
        return;
    }

    adminTableBody.innerHTML = PRODUCTS_DATA.map(product => `
        <tr>
            <td>
                <img src="${product.image}" alt="${product.name}" class="admin-img-thumb" onerror="this.src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=200&q=80'">
            </td>
            <td>
                <strong>${product.name}</strong>
                ${product.badge ? `<br><span style="font-size: 0.72rem; background: var(--surface-card-subtle); padding: 2px 6px; border-radius: 4px; color: var(--wood-primary); border: 1px solid var(--surface-border); font-weight: 700;">${product.badge}</span>` : ''}
            </td>
            <td><span style="text-transform: capitalize; color: var(--wood-primary); font-weight: 600;">${product.category}</span></td>
            <td style="font-size: 0.85rem; color: var(--text-muted);">${product.wood}</td>
            <td>
                <div style="display: flex; align-items: center; gap: 4px;">
                    <span style="font-weight: 700; color: var(--wood-primary);">₹</span>
                    <input type="number" class="editor-input admin-table-price-input" data-id="${product.id}" value="${product.priceVal}" step="500" min="500">
                </div>
            </td>
            <td>
                <button type="button" class="btn btn-danger" onclick="deleteProductFromAdmin('${product.id}')" title="Remove item from live catalog">
                    <i class="fa-solid fa-trash"></i> Delete
                </button>
            </td>
        </tr>
    `).join('');
}

function updateAdminStats() {
    const totalItemsElem = document.getElementById('statTotalItems');
    const totalCatElem = document.getElementById('statTotalCategories');
    const phoneElem = document.getElementById('statPhone');
    const phoneInput = document.getElementById('adminPhoneInput');

    if (totalItemsElem) totalItemsElem.textContent = PRODUCTS_DATA.length;
    if (totalCatElem) {
        const categories = new Set(PRODUCTS_DATA.map(p => p.category));
        totalCatElem.textContent = categories.size;
    }
    if (phoneElem) phoneElem.textContent = WORKSHOP_CONFIG.phone;
    if (phoneInput) phoneInput.value = WORKSHOP_CONFIG.phone;
}

window.handleAddNewProduct = function(e) {
    e.preventDefault();

    const name = document.getElementById('newProdName').value.trim();
    const category = document.getElementById('newProdCategory').value;
    const priceVal = parseInt(document.getElementById('newProdPrice').value, 10);
    const badge = document.getElementById('newProdBadge').value.trim() || 'Custom Built';
    const wood = document.getElementById('newProdWood').value.trim();
    const image = document.getElementById('newProdImage').value.trim();
    const dimensions = document.getElementById('newProdDimensions').value.trim() || 'Custom Dimensions';
    const warranty = document.getElementById('newProdWarranty').value.trim() || '10 Years Warranty';
    const desc = document.getElementById('newProdDesc').value.trim();

    if (!name || isNaN(priceVal) || !wood || !image || !desc) {
        alert('Please fill out all required fields marked with *');
        return;
    }

    const newProduct = {
        id: 'custom-item-' + Date.now(),
        name: name,
        category: category,
        priceRange: `Starting @ ₹${priceVal.toLocaleString('en-IN')}`,
        priceVal: priceVal,
        badge: badge,
        wood: wood,
        image: image,
        desc: desc,
        dimensions: dimensions,
        warranty: warranty,
        finish: 'Natural Polish / Customized'
    };

    PRODUCTS_DATA.unshift(newProduct); // Add to top of catalog
    localStorage.setItem('woodcraft_custom_products', JSON.stringify(PRODUCTS_DATA));

    document.getElementById('addNewProductForm').reset();
    renderAdminTable();
    updateAdminStats();
    showToast(`"${name}" has been added live to your website catalog!`);
};

window.deleteProductFromAdmin = function(productId) {
    const item = PRODUCTS_DATA.find(p => p.id === productId);
    const itemName = item ? item.name : 'this item';

    if (confirm(`Are you sure you want to remove "${itemName}" from the website catalog?`)) {
        PRODUCTS_DATA = PRODUCTS_DATA.filter(p => p.id !== productId);
        localStorage.setItem('woodcraft_custom_products', JSON.stringify(PRODUCTS_DATA));
        renderAdminTable();
        updateAdminStats();
        showToast(`Removed "${itemName}" from catalog.`);
    }
};

window.saveAdminPhone = function() {
    const phoneInput = document.getElementById('adminPhoneInput');
    if (!phoneInput || !phoneInput.value.trim()) return;

    const rawPhone = phoneInput.value.trim();
    WORKSHOP_CONFIG.phone = rawPhone;
    WORKSHOP_CONFIG.whatsappNumber = rawPhone.replace(/\D/g, '');
    localStorage.setItem('woodcraft_custom_phone', rawPhone);

    updateAdminStats();
    showToast('WhatsApp hotline updated to ' + rawPhone);
};

window.saveAdminTableChanges = function() {
    const inputs = document.querySelectorAll('.admin-table-price-input');
    inputs.forEach(input => {
        const prodId = input.getAttribute('data-id');
        const newPrice = parseInt(input.value, 10);
        if (!isNaN(newPrice) && newPrice > 0) {
            const prod = PRODUCTS_DATA.find(p => p.id === prodId);
            if (prod) {
                prod.priceVal = newPrice;
                prod.priceRange = `Starting @ ₹${newPrice.toLocaleString('en-IN')}`;
            }
        }
    });

    localStorage.setItem('woodcraft_custom_products', JSON.stringify(PRODUCTS_DATA));
    renderAdminTable();
    showToast('All product prices updated live on your customer site!');
};

window.resetAdminDefaults = function() {
    if (confirm('Reset entire product catalog and phone number back to default factory settings?')) {
        localStorage.removeItem('woodcraft_custom_products');
        localStorage.removeItem('woodcraft_custom_phone');
        PRODUCTS_DATA = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
        WORKSHOP_CONFIG = { ...DEFAULT_CONFIG };
        loadSavedCustomPrices();
        renderAdminTable();
        updateAdminStats();
        showToast('Reset to original default catalog & prices.');
    }
};

