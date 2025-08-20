export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      let updatedItems;
      if (existingItem) {
        updatedItems = state.items.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...state.items, { ...newItem, quantity: 1 }];
      }
      return { ...state, items: updatedItems };
    }

    case "REMOVE_ITEM": {
      const itemIdToRemove = action.payload;
      const updatedItems = state.items.filter(
        (item) => item.id !== itemIdToRemove
      );
      return { ...state, items: updatedItems };
    }

    case "INCREASE_QUANTITY": {
      const itemIdToIncrease = action.payload;
      const updatedItems = state.items.map((item) =>
        item.id === itemIdToIncrease
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return { ...state, items: updatedItems };
    }

    case "DECREASE_QUANTITY": {
      const itemIdToDecrease = action.payload;
      const updatedItems = state.items
        .map((item) => {
          if (item.id === itemIdToDecrease) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);

      return { ...state, items: updatedItems };
    }

    case "CLEAR_CART": {
      return {
        ...state,
        items: [],
      };
    }

    default:
      return state;
  }
};
