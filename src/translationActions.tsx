export const setHebrew = (hebrew: string) => {
  return {
    type: "SET_HEBREW",
    payload: hebrew,
  };
};

export const setGreek = (greek: string) => {
  return {
    type: "SET_GREEK",
    payload: greek,
  };
};
