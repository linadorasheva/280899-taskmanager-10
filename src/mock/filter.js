const filterNames = [`ALL`, `OVERDUE`, `TODAY`, `FAVORITES`, `REPEATING`, `TAGS`, `ARCHIVE`];

export const generateFilters = () => {
  return filterNames.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * 10),
    };
  });
};
