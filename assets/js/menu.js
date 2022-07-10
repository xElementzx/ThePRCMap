class Menu {
  static init() {
    this.tippyInstances = [];
    Loader.mapModelLoaded.then(this.activateHandlers.bind(this));
  }

  static reorderMenu(menu) {
    $(menu).children().sort(function (a, b) {
      return a.textContent.toLowerCase().localeCompare(b.textContent.toLowerCase());
    }).appendTo(menu);

    if ($(menu).children('.new').length > 0)
      $(`[data-type=${$(menu).attr('data-type')}]`).toggleClass('new', true);

  }

  static activateHandlers() {

    const help = document.getElementById('help-container');
    const $helpParagraph = $(help).children('p');
    $('.side-menu, .top-widget, .lat-lng-container')
      .on('mouseover mouseout', event => {
        const target = event.type === 'mouseover' ? event.target : event.relatedTarget;

        // keep current help if pointer jumped to help container or it overgrew current pointer pos.
        if (help.contains(target)) return;
        const helpTransId = $(target).closest('[data-help]').attr('data-help') || 'default';
        $helpParagraph.html(Language.get(`help.${helpTransId}`));
      });

    $('.menu-hide-all').on('click', function () {
      Shop.locations.forEach(shop => {
        if (shop.onMap) shop.onMap = !shop.onMap;
      });
      PlantsCollection.locations.forEach(_plants => {
        if (_plants.onMap) _plants.onMap = !_plants.onMap;
      });
      Location.locations.forEach(loc => {
        if (loc.onMap) loc.onMap = !loc.onMap;
      });
    });

    $('.menu-show-all').on('click', function () {
      Shop.locations.forEach(shop => {
        if (!shop.onMap) shop.onMap = !shop.onMap;
      });
      PlantsCollection.locations.forEach(_plants => {
        if (!_plants.onMap) _plants.onMap = !_plants.onMap;
      });
      setTimeout(() => PlantsCollection.layer.redraw(), 40);
      Location.locations.forEach(loc => {
        if (!loc.onMap) loc.onMap = !loc.onMap;
      });
    });

    $('.shops-hide-btn').on('click', function () {
      Shop.locations.forEach(shop => {
        if (shop.onMap) shop.onMap = !shop.onMap;
      });
    });
    $('.shops-show-btn').on('click', function () {
      Shop.locations.forEach(shop => {
        if (!shop.onMap) shop.onMap = !shop.onMap;
      });
    });

    $('.plants-hide-btn').on('click', function () {
      PlantsCollection.locations.forEach(_plants => {
        if (_plants.onMap) _plants.onMap = !_plants.onMap;
      });
    });
    $('.plants-show-btn').on('click', function () {
      PlantsCollection.locations.forEach(_plants => {
        if (!_plants.onMap) _plants.onMap = !_plants.onMap;
      });
      setTimeout(() => PlantsCollection.layer.redraw(), 40);
    });
  }

  static updateTippy() {
    Menu.tippyInstances.forEach(instance => instance.destroy());
    Menu.tippyInstances = [];

    if (!Settings.showTooltips) return;

    Menu.tippyInstances = tippy('[data-tippy-content]', { theme: 'menu-theme' });
  }
}
