export const handleOpenModal = (id, setPlayerId, setModalOpened) => {
  setPlayerId(id);
  setModalOpened(true);
}

export const formatDropdownOption = (option) => {
  const stringAtual = option.split('-');
  return [parseInt(stringAtual[0]), parseInt(stringAtual[1])];
}
