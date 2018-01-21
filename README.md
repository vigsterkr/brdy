# Map your hotspots

A small React-Redux based application that allows you drop pinponts on a map and add meta-data - namely audio and video - to be presented once clicked on the pin.


## Configuration

There are two configuration files required for the application:
  * `src/settings.json` for application wide settings
  * `src/locations.json` for the locational information

### settings.json

The `src/settings.json` is the application-wise setting for MapBox and the application itself.
Minimum requirement content:

```
{
  "mapbox": {
    "viewport": {
      ....
    },
    "settings": {
      ...
    }
  },
  "breakpointTimeout": 8000
}
```

`breakpointTimeout` specifies the amount of milliseconds the automated breakpoint will be presented to the user.

### locations.json

For specifying the locations of the pin-points one should populate a JSON array of the location objects, that looks like the following:

```
  {"name":"Location1","coordinates":[50.00, 0.300173],
    "icon": "location1.png", "sound": "location1_sound", "video": "location1_video", "breakpoint_sound": "breakpoint1_sound",
    "breakpoints": [
      {"timestamp": 99, "options": ["location2", "location3"]},
      {"timestamp": 219, "options": ["location4", "location2"]}
    ]
  }
```

The assumption regarding the media files (`sound`, `video`, `breakpoint_sound`):
 * then are located in the corresponding `media` folder, namely the videos are places in `media/video` the audio files are located in the `media/audio` folders (TODO: add a possibility to specify hyperlink).
 * the filenames are specified without their extension as the assumption is that both ogg and mp4 containers are present.

The elements in the `breakpoints` specifies breakpoints in the selected items video.
A `breakpoint` object shall contain the following information:
	* `timestamp`: seconds from start of the video when the breakpoint should be presented
	* `options`: array of the location names that should be presented as choices. Note that the element shall be present in the `locations.json` in order to be presentable.
