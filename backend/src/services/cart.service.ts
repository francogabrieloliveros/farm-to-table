import { Cart } from '../models/cart.model.js';
import type { ICartDocument } from '../types/cart.types.js';

export class CartService {

  // retrieve the cart for a given user
  // creates an empty cart on the fly if one doesn't exist yet
  static async getCartByUserId(userId: string): Promise<ICartDocument> {
    let cart = await Cart.findOne({ userId }).populate('items.productId').exec();

    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
      // re-populate so the response shape is consistent
      cart = await cart.populate('items.productId');
    }

    return cart;
  }

  // add a product to the cart or increase its quantity if it already exists
  static async addItem(
    userId: string,
    productId: string,
    quantity: number = 1
  ): Promise<ICartDocument> {
    let cart = await Cart.findOne({ userId }).exec();

    if (!cart) {
      cart = await Cart.create({ userId, items: [{ productId, quantity }] });
    } else {
      // check if this product is already in the cart
      const existing = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity } as any);
      }

      await cart.save();
    }

    return cart.populate('items.productId');
  }

  // set the quantity of a specific cart item
  // if quantity  drops to 0, the item is removed
  static async updateItemQuantity(
    userId: string,
    productId: string,
    quantity: number
  ): Promise<ICartDocument | null> {
    const cart = await Cart.findOne({ userId }).exec();
    if (!cart) return null;

    const idx = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (idx === -1) return null;

    if (quantity <= 0) {
      cart.items.splice(idx, 1);
    } else {
      cart.items[idx].quantity = quantity;
    }

    await cart.save();
    return cart.populate('items.productId');
  }

  // remove a specific product from the cart entirely.
  static async removeItem(
    userId: string,
    productId: string
  ): Promise<ICartDocument | null> {
    const cart = await Cart.findOne({ userId }).exec();
    if (!cart) return null;

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    return cart.populate('items.productId');
  }

  // empty all items from the user's cart (post-checkout)
  static async clearCart(userId: string): Promise<ICartDocument | null> {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $set: { items: [] } },
      { returnDocument: 'after' }
    ).exec();

    return cart ? cart.populate('items.productId') : null;
  }
}
