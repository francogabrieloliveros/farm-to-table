import { type Product } from "@/types/Product";

function searchInventory(query: string, inventory: Product[]): Product[] {
  return inventory.filter((item) => {
    const formatQ = query.toLowerCase();
    return (
      item.name.toLowerCase().includes(formatQ) ||
      item.description.toLocaleLowerCase().includes(formatQ) ||
      item.quantity.toString().includes(formatQ) ||
      item.price.toString().includes(formatQ) ||
      `${item.type === 1 ? "crop" : "poultry"}`.includes(formatQ)
    );
  });
}

export { searchInventory };
