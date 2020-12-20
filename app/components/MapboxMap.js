import React, {useEffect} from 'react';
import {StyleSheet, Platform, View, Dimensions} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {useDispatch, useSelector} from 'react-redux';
import setUserLongitudeAndLatitude from '../functions/setUserLongitudeAndLatitude';

// Window dimensions:
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

// Public token:
const MAPBOX_PUBLIC_TOKEN =
  'pk.eyJ1IjoibmFzc2ltY2hlbm91ZiIsImEiOiJja2R1NjE2amMzYnl4MzByb3c5YmxlMGY5In0.cBj3YeAh0UMxinxOfhDLIw';

// Style URL:
const mapboxStyleURL =
  'mapbox://styles/nassimchenouf/cke1zrnot0g1619oql47m98cz';

// Authenticating Mapbox API token:
MapboxGL.setAccessToken(MAPBOX_PUBLIC_TOKEN);

// Only necessary to do set connected on Android operating systems:
if (Platform.OS === 'android') {
  MapboxGL.setConnected(true);
}

const MapboxMap = (props) => {
  // Creating dispatch to allow for updating redux store state:
  const dispatch = useDispatch();

  // Setting the coordinate bounds for use in camera once a route is loaded:
  const mostNorthEasternCoordinates = useSelector(
    (state) => state.mostNorthEasternCoordinates,
  );
  const mostSouthWesternCoordinates = useSelector(
    (state) => state.mostSouthWesternCoordinates,
  );
  const cameraBoundsConfig = {
    ne: mostNorthEasternCoordinates,
    sw: mostSouthWesternCoordinates,
    paddingRight: 50,
    paddingLeft: 50,
    paddingBottom: height * 0.05 + 160,
    paddingTop: height * 0.05 + 160,
  };

  // Route coordinates that will be rendered on screen:
  const finalRouteLineString = useSelector(
    (state) => state.finalRouteLineString,
  );

  // Set user location on initial render:
  useEffect(() => {
    setUserLongitudeAndLatitude(dispatch);
  }, []);

  return (
    <MapboxGL.MapView
      style={styles.map}
      styleURL={mapboxStyleURL}
      zoomEnabled={false}
      pitchEnabled={false}
      rotateEnabled={false}
      scrollEnabled={false}>
      <MapboxGL.Camera
        animationDuration={2000}
        animationMode={'flyTo'}
        {...(mostNorthEasternCoordinates === null ||
        mostSouthWesternCoordinates === null
          ? {
              centerCoordinate: [props.originLongitude, props.originLatitude],
              zoomLevel: 13,
            }
          : {bounds: cameraBoundsConfig})}
      />
      {finalRouteLineString.coordinates.length === 0 ? null : (
        <MapboxGL.ShapeSource id="optimised" shape={finalRouteLineString}>
          <MapboxGL.LineLayer
            id="optimisedLine"
            style={layerStyles.routeLine}
          />
        </MapboxGL.ShapeSource>
      )}
      <MapboxGL.PointAnnotation
        id="origin-point"
        coordinate={[props.originLongitude, props.originLatitude]}>
        <View style={styles.locationPoint} />
      </MapboxGL.PointAnnotation>
    </MapboxGL.MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  locationPoint: {
    height: 28,
    width: 28,
    backgroundColor: '#40798C',
    borderRadius: 14,
    borderColor: '#fff',
    borderWidth: 3,
  },
});

const layerStyles = {
  routeLine: {
    lineColor: '#F24E4E',
    lineWidth: 4,
    lineOpacity: 0.5,
  },
};

export default MapboxMap;
