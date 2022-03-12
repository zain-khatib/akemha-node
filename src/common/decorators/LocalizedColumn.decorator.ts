import {
  addAttribute,
  isDataType,
  getSequelizeTypeByDesignType,
} from 'sequelize-typescript';
import { ModelAttributeColumnOptions, DataType, DataTypes } from 'sequelize';
import * as _ from 'lodash';
import { Locals } from '../enums/locals.enum';

export function LocalizedColumn(dataType: DataType): Function;
export function LocalizedColumn(
  options: Partial<ModelAttributeColumnOptions>,
): Function;
export function LocalizedColumn(
  target: any,
  propertyName: string,
  propertyDescriptor?: PropertyDescriptor,
): void;
export function LocalizedColumn(...args: any[]): Function | void {
  // In case of no specified options, we infer the
  // sequelize data type by the type of the property
  if (args.length >= 2) {
    const target = args[0];
    const propertyName = args[1];
    const propertyDescriptor = args[2];
    annotate(target, propertyName, propertyDescriptor);
    return;
  }
  return (
    target: any,
    propertyName: string,
    propertyDescriptor?: PropertyDescriptor,
  ) => {
    annotate(target, propertyName, propertyDescriptor, args[0]);
  };
}

function annotate(
  target: any,
  propertyName: string,
  propertyDescriptor?: PropertyDescriptor,
  optionsOrDataType: Partial<ModelAttributeColumnOptions> | DataType = {},
): void {
  let options: Partial<ModelAttributeColumnOptions>;
  if (isDataType(optionsOrDataType)) {
    options = {
      type: optionsOrDataType,
    };
  } else {
    options = { ...(optionsOrDataType as ModelAttributeColumnOptions) };
    if (!options.type) {
      options.type = getSequelizeTypeByDesignType(target, propertyName);
    }
  }
  if (propertyDescriptor) {
    if (propertyDescriptor.get) {
      options.get = propertyDescriptor.get;
    }
    if (propertyDescriptor.set) {
      options.set = propertyDescriptor.set;
    }
  }
  // <modification>

  const columnsNames = {};

  //get names array as names

  Object.values(Locals).forEach(app => {
    const columnName = _.camelCase(`${propertyName} ${app}`);
    columnsNames[app] = columnName;
    addAttribute(target, columnName, options);
  });

  const virtualOptions = Object.assign(options, {
    ...options,
    type: DataTypes.VIRTUAL(DataTypes.STRING, Object.values(columnsNames)),
    allowNull: undefined,
    columnsNames,
    get() {
      const local = Locals[this.$local || 'ar'];
      const column = _.camelCase(`${propertyName} ${local}`);
      return this[column];
    },
    set(value) {
      const local = Locals[this.$local || 'ar'];
      const column = _.camelCase(`${propertyName} ${local}`);
      return this[column] = value;
    }
  });
  // <endModification>
  addAttribute(target, propertyName, virtualOptions);
}
