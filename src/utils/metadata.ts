import { IconType } from "../components/shaIcon";
import { DataTypes } from "../interfaces/dataTypes";

export const getIconByDataType = (dataType: string):IconType => {
    switch(dataType) {
      case DataTypes.string: return 'FieldStringOutlined';
      case DataTypes.number: return 'FieldNumberOutlined';
      case DataTypes.entityReference: return 'PartitionOutlined';
      case DataTypes.date: return 'CalendarOutlined';
      case DataTypes.dateTime: return 'FieldTimeOutlined';
      case DataTypes.time: return 'ClockCircleOutlined';
      case DataTypes.guid: return 'LinkOutlined';
      case DataTypes.boolean: return 'CheckSquareOutlined';
      case DataTypes.referenceListItem: return 'BookOutlined';    
      
      default: return null;
    }
  }