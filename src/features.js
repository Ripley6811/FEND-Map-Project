var app = app || {};

/**
 * List of feature objects.
 * <ul>
 * <li>title - Description string for icon on map.
 * <li>position { lat: ##.##, lon: ##.## }
 * <li>icon - Path to image to use on map.
 * </ul>
 * @type {Array.<Object>}
 */
app.features = [
    {
        title: 'Archery range',
        position: { lat: 22.734471, lon: 120.333068 },
        icon: 'icons/archery.png'
    },
    {
        title: 'Jogging in the park',
        position: { lat: 22.731795, lon: 120.316772 },
        icon: 'icons/jogging.png'
    },
    {
        title: 'Mountain hiking',
        position: { lat: 22.725501, lon: 120.370888 },
        icon: 'icons/hiking.png'
    },
    {
        title: 'Swimming pool',
        position: { lat: 22.733508, lon: 120.331715 },
        icon: 'icons/swimming.png'
    },
    {
        title: 'Bicycle maintenance',
        position: { lat: 22.731711, lon: 120.329520 },
        icon: 'icons/cycling.png'
    }
];