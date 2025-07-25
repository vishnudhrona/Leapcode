import { DataTypes } from "sequelize";
import { sequelize } from "../models";

const Product = sequelize.define('products', {
    name: {
      type: DataTypes .STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  
  export default Product;