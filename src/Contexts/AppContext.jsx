import React, { useEffect, useReducer } from "react";
import { AppContext } from "..";
import { categories } from "../Data/CategoriesData";
import { videos } from "../Data/VideosData";

function AppContextProvider({ children }) {
  const isAddedToWatchLater = (_id) => {
    return state.watchLaterList.find((item) => item._id === _id);
  };

  const reducerFunction = (state, action) => {
    switch (action.type) {
      case "UPDATE_SEARCH_TEXT": {
        return { ...state, searchText: action.payload };
      }
      case "UPDATE_FILTER_CATEGORY_NAME": {
        return { ...state, filterByCategory: action.payload };
      }
      case "UPDATE_FILTERED_LIST": {
        return { ...state, filteredList: action.payload };
      }
      case "ADD_TO_WATCH_LATER": {
        return {
          ...state,
          watchLaterList: [
            ...state.watchLaterList,
            state.videosData.find(({ _id }) => _id === action.payload),
          ],
        };
      }

      case "REMOVE_FROM_WATCH_LATER": {
        return {
          ...state,
          watchLaterList: state.watchLaterList.filter(
            ({ _id }) => _id !== action.payload
          ),
        };
      }

      case "SET_SINGLE_VIDEO": {
        return { ...state, singleVideoData: action.payload };
      }

      case "ADD_NOTE_TO_VIDEO": {
        return {
          ...state,
          videosData: state.videosData.reduce((acc, curr) => {
            return curr._id === action.payload._id
              ? [
                  ...acc,
                  { ...curr, notes: [...curr?.notes, action.payload.text] },
                ]
              : [...acc, curr];
          }, []),
        };
      }

      case "ADD_NEW_PLAYLIST": {
        return {
          ...state,
          playLists: [
            ...state.playLists,
            {
              ...action.payload,
              videos: [],
              thumbnail: "https://loremflickr.com/320/240/nature",
            },
          ],
        };
      }

      case "DELETE_PLAYLIST": {
        return {
          ...state,
          playLists: state.playLists.filter(
            ({ name }) => name !== action.payload
          ),
        };
      }

      case "ADD_TO_PLAYLIST": {
        return {
          ...state,
          playLists: state.playLists.reduce((acc, curr) => {
            return curr.name === action.payload.playListName
              ? [
                  ...acc,
                  {
                    ...curr,
                    videos: [
                      ...curr.videos,
                      state.videosData.find(
                        (video) => video._id === action.payload._id
                      ),
                    ],
                  },
                ]
              : [...acc, curr];
          }, []),
        };
      }

      case "REMOVE_FROM_PLAYLIST": {
        return {
          ...state,
          playLists: state.playLists.reduce((acc, curr) => {
            return curr.name === action.payload.playListName
              ? [
                  ...acc,
                  {
                    ...curr,
                    videos: curr.videos.filter(
                      (video) => video._id !== action.payload._id
                    ),
                  },
                ]
              : [...acc, curr];
          }, []),
        };
      }

      case "SET_SINGLE_PLAYLIST": {
        return { ...state, singlePlaylist: action.payload };
      }

      case "UPDATE_EXPLORE_LIST": {
        return { ...state, exploreList: action.payload };
      }

      case "EDIT_NOTE": {
        return {
          ...state,
          videosData: state.videosData.reduce((acc, curr) => {
            return curr._id === action.payload._id
              ? [
                  ...acc,
                  {
                    ...curr,
                    notes: curr.notes.reduce((acc, curr) => {
                      return curr === action.payload.originalText
                        ? [...acc, action.payload.text]
                        : [...acc, curr];
                    }, []),
                  },
                ]
              : [...acc, curr];
          }, []),
        };
      }

      case "UPDATE_EDIT_NOTE_DATA": {
        return { ...state, editNoteData: action.payload };
      }

      case "DELETE_NOTE": {
        return {
          ...state,
          videosData: state.videosData.reduce((acc, curr) => {
            return curr._id === action.payload._id
              ? [
                  ...acc,
                  {
                    ...curr,
                    notes: curr.notes.filter(
                      (item) => item !== action.payload.note
                    ),
                  },
                ]
              : [...acc, curr];
          }, []),
        };
      }

      default:
        return state;
    }
  };

  const initialValue = {
    categoriesList: categories,
    videosData: videos,
    filteredList: videos,
    exploreList: videos,
    singleVideoData: {},
    singlePlaylist: {},
    watchLaterList: [],
    editNoteData: "",
    playLists: [
      {
        name: "Travel Hits",
        desc: "my personal favourites",
        videos: [
          {
            _id: 23,
            title: "Handmade Pottery Vases - Decorating with Ceramic Glaze",
            views: 2879,
            chips: ["pottery", "clay", "vases", "ceramic glaze"],
            thumbnail: "https://picsum.photos/300/178",
            src: "https://www.youtube.com/embed/GBIIQ0kP15E",
            category: "Pottery",
            notes: [],
            creator: "CeramicArtistry",
          },
          {
            _id: 24,
            title: "Quilling Art Techniques - Creating Intricate Designs",
            views: 1756,
            chips: ["quilling", "paper art", "techniques", "intricate designs"],
            thumbnail: "https://picsum.photos/300/179",
            src: "https://www.youtube.com/embed/GBIIQ0kP15E",
            category: "Quilling",
            notes: [],
            creator: "ArtfulQuills",
          },
        ],
        thumbnail: "https://loremflickr.com/320/240/road",
      },
    ],
    searchText: "",
    filterByCategory: "",
  };
  const [state, dispatch] = useReducer(reducerFunction, initialValue);

  useEffect(() => {
    let data = [...state.videosData];
    if (state.filterByCategory) {
      data = data.filter((video) => {
        return video.category
          .toLowerCase()
          .includes(state.filterByCategory.toLowerCase());
      });
    }
    dispatch({ type: "UPDATE_FILTERED_LIST", payload: data });
  }, [state.filterByCategory]);

  useEffect(() => {
    let data = [...state.videosData];

    if (state.searchText) {
      data = data.filter((video) => {
        return video.title
          .toLowerCase()
          .includes(state.searchText.toLowerCase());
      });
    }

    dispatch({ type: "UPDATE_EXPLORE_LIST", payload: data });
  }, [state.searchText]);

  return (
    <AppContext.Provider value={{ state, dispatch, isAddedToWatchLater }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
