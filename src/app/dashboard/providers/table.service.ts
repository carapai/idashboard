import {Injectable} from '@angular/core';
import {Visualization} from '../model/visualization';
import {VisualizationService} from './visualization.service';
import {TableConfiguration} from '../model/table-configuration';
import * as _ from 'lodash';

@Injectable()
export class TableService {

  constructor(private visualizationService: VisualizationService) {
  }

  getTableConfiguration(visualizationDetails: any): any {
    const visualizationSettings = visualizationDetails.visualizationSettings;
    const type = visualizationDetails.visualizationType;
    const tableConfigurations: any[] = [];
    visualizationSettings.forEach(favoriteObject => {
      const visualizationLayoutObject: any = _.find(visualizationDetails.visualizationLayout, ['id', favoriteObject.id]);
      const tableConfiguration: any = {
        title: favoriteObject.hasOwnProperty('displayName') ? favoriteObject.displayName : favoriteObject.hasOwnProperty('name') ? favoriteObject.name : '',
        subtitle: favoriteObject.hasOwnProperty('subtitle') ? favoriteObject.subtitle : '',
        showColumnTotal: favoriteObject.hasOwnProperty('colTotal') ? favoriteObject.colTotal : false,
        showColumnSubtotal: favoriteObject.hasOwnProperty('colSubtotal') ? favoriteObject.colSubtotal : false,
        showRowTotal: favoriteObject.hasOwnProperty('rowTotal') ? favoriteObject.rowTotal : false,
        showRowSubtotal: favoriteObject.hasOwnProperty('rowSubtotal') ? favoriteObject.rowSubtotal : false,
        showDimensionLabels: favoriteObject.hasOwnProperty('showDimensionLabels') ? favoriteObject.showDimensionLabels : true,
        hideEmptyRows: favoriteObject.hasOwnProperty('hideEmptyRows') ? favoriteObject.hideEmptyRows : true,
        showHierarchy: favoriteObject.hasOwnProperty('showHierarchy') ? favoriteObject.showHierarchy : true,
        displayList: this._checkForEventDataType(favoriteObject, type),
        rows: visualizationLayoutObject ? visualizationLayoutObject.layout.rows.map(row => {
          return row.value
        }) : ['pe'],
        columns: visualizationLayoutObject ? visualizationLayoutObject.layout.columns.map(column => {
          return column.value
        }) : ['dx']
      };
      tableConfigurations.push({id: favoriteObject.id, content: tableConfiguration})
    });
    visualizationDetails.tableConfigurations = tableConfigurations;
    return visualizationDetails;
  }

  getTableConfiguration1(favoriteObject: any, visualizationLayout: any, type: string) {
    return {
      title: favoriteObject.hasOwnProperty('displayName') ? favoriteObject.displayName : favoriteObject.hasOwnProperty('name') ? favoriteObject.name : '',
      subtitle: favoriteObject.hasOwnProperty('subtitle') ? favoriteObject.subtitle : '',
      showColumnTotal: favoriteObject.hasOwnProperty('colTotal') ? favoriteObject.colTotal : true,
      showColumnSubtotal: favoriteObject.hasOwnProperty('colSubtotal') ? favoriteObject.colSubtotal : true,
      showRowTotal: favoriteObject.hasOwnProperty('rowTotal') ? favoriteObject.rowTotal : true,
      showRowSubtotal: favoriteObject.hasOwnProperty('rowSubtotal') ? favoriteObject.rowSubtotal : true,
      showDimensionLabels: favoriteObject.hasOwnProperty('showDimensionLabels') ? favoriteObject.showDimensionLabels : true,
      hideEmptyRows: favoriteObject.hasOwnProperty('hideEmptyRows') ? favoriteObject.hideEmptyRows : true,
      showHierarchy: favoriteObject.hasOwnProperty('showHierarchy') ? favoriteObject.showHierarchy : true,
      displayList: this._checkForEventDataType(favoriteObject, type),
      rows: visualizationLayout ? visualizationLayout.rows.map(row => {
        return row.value
      }) : ['pe'],
      columns: visualizationLayout ? visualizationLayout.columns.map(column => {
        return column.value
      }) : ['dx']
    };
  }

  private _checkForEventDataType(favoriteObject, favoriteType): boolean {
    let displayList: boolean = false;
    if (favoriteType === 'EVENT_REPORT') {
      if (favoriteObject.hasOwnProperty('dataType') && favoriteObject.dataType === 'EVENTS') {
        displayList = true;
      }
    }
    return displayList;
  }

  public getTableObjects(visualizationObject: Visualization): any {
    let tableObjects: any[] = [];
    if (visualizationObject.layers) {
      tableObjects = visualizationObject.layers.map((layer: any) => {
        let tableObject: any = null;
        if (layer.analytics) {
          tableObject = this.visualizationService.drawTable(layer.analytics,layer.settings, layer.settings.tableConfiguration);
        }
        return {id: layer.settings.id, content: tableObject};
      });
    }
    return {visualizationObject: visualizationObject, tableObjects: tableObjects};
  }

  getTableObject(analyticsObject: any,settings:any, tableConfiguration: TableConfiguration) {
    if (!analyticsObject) {
      return null;
    }

    return this.visualizationService.drawTable(analyticsObject,settings, tableConfiguration);
  }

  private _getCellColorValue(settings, tableCellValue) {
    let cellColor = '';
    if (!settings.hasOwnProperty('legendSet')) {
      return '';
    } else {
      const legends = settings.legendSet.legends;
      if (isNaN(tableCellValue)) {
        return '';
      }
      legends.forEach(legend => {
        if (legend.startValue <= tableCellValue && legend.endValue > tableCellValue) {
          cellColor = legend.color;
          return;
        }
      })
      return cellColor;
    }
  }

}
