class Marker {
  constructor(text, lat, lng, category, subdata, size) {
    this.text = text;
    this.lat = lat;
    this.lng = lng;
    this.category = category;
    this.subdata = subdata;
    this.size = size;
    this.title = (() => {
      switch (category) {
        case 'shops':
          return Language.get(`map.${this.category}.${this.subdata}.name`);
        default:
            return Language.get(`map.${this.category}.name`);
      }
    })();
    this.description = (() => {
      switch (category) {
        case 'shops':
          return Language.get(`map.${this.category}.${this.subdata}.desc`);
        default:
          return Language.get(`map.${this.category}.desc`);
      }
    })();
  }
  updateMarkerContent(removeFromMapCallback) {
    const linksElement = $('<p>');
    return $(`
      <div>
        <h1>${this.title}</h1>
        <span class="marker-content-wrapper">
          <p>${this.description}</p>
        </span>
        ${linksElement.prop('outerHTML')}
        <small>Text: ${this.text} / Latitude: ${this.lat} / Longitude: ${this.lng}</small>
      </div>
    `)
      .translate()
      .find('button')
      .on('click', removeFromMapCallback)
      .end()
      .find('small')
      .toggle(Settings.isDebugEnabled)
      .end()[0];
  }
}