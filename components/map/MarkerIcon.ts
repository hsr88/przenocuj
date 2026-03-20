import L from 'leaflet';

export function createMarkerIcon(type: string, isFavorite: boolean = false, isStatic: boolean = true): L.DivIcon {
  const colors: Record<string, string> = {
    free: '#22c55e',
    zanocuj: '#16a34a',
    van: '#3b82f6',
    glamping: '#a855f7',
    bike: '#f97316',
    warning: '#dc2626'
  };

  const icons: Record<string, string> = {
    free: 'fa-tree',
    zanocuj: 'fa-campground',
    van: 'fa-caravan',
    glamping: 'fa-star',
    bike: 'fa-bicycle',
    warning: 'fa-exclamation-triangle'
  };

  const color = colors[type] || colors.free;
  const iconClass = icons[type] || icons.free;
  const pulseClass = isFavorite ? 'marker-pulse' : '';
  
  // OSM places are smaller and slightly transparent
  const size = isStatic ? '32px' : '24px';
  const fontSize = isStatic ? '14px' : '11px';
  const opacity = isStatic ? '1' : '0.85';
  const borderWidth = isStatic ? '3px' : '2px';

  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div class="custom-marker ${pulseClass}" 
           style="border-color: ${color}; 
                  color: ${color}; 
                  width: ${size}; 
                  height: ${size}; 
                  border-width: ${borderWidth};
                  opacity: ${opacity};
                  font-size: ${fontSize};">
        <i class="fas ${iconClass}"></i>
      </div>
    `,
    iconSize: isStatic ? [32, 32] : [24, 24],
    iconAnchor: isStatic ? [16, 32] : [12, 24],
    popupAnchor: isStatic ? [0, -32] : [0, -24]
  });
}
