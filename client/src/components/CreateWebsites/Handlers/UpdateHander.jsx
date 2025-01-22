// UpdateHandler.js
export const handleUpdate = (data, onUpdate) => (section, key, value, index = null) => {
  // If index is provided, we're updating an array item
  if (index !== null) {
    // Check if the section has an 'items' array
    if (['header', 'services', 'projects'].includes(section)) {
      const updatedData = {
        ...data,
        [section]: {
          ...data[section],
          items: data[section].items.map((item, i) =>
            i === index ? { ...item, [key]: value } : item
          ),
        },
      };
      onUpdate(updatedData);
      return;
    }
  }

  // Handle nested object updates (like about.details)
  if (typeof value === 'object' && value !== null) {
    const updatedData = {
      ...data,
      [section]: {
        ...data[section],
        [key]: value,
      },
    };
    onUpdate(updatedData);
    return;
  }

  // Handle regular property updates
  const updatedData = {
    ...data,
    [section]: {
      ...data[section],
      [key]: value,
    },
  };
  onUpdate(updatedData);
};