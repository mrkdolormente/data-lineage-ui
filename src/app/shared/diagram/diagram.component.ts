import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as go from 'gojs';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DiagramComponent implements OnInit {
  public diagramDivClassName: string = 'myDiagramDiv';

  // initialize diagram / templates
  public initDiagram(): go.Diagram {
    const $ = go.GraphObject.make;

    const myDiagram = $(go.Diagram, {
      layout: $(go.TreeLayout, {
        setsPortSpot: false,
        setsChildPortSpot: false,
        isRealtime: false,
      }),
      model: new go.GraphLinksModel(
        [
          {
            key: 1,
            header: 'Supplier',
            text: 'Planned Order Variations',
            footer: 'Retailer',
            role: 'b',
          },
          {
            key: 2,
            header: 'Supplier',
            text: 'Order & Delivery Variations',
            footer: 'Retailer',
            role: 't',
            loop: true,
          },
          {
            key: 3,
            header: 'Supplier',
            isGroup: true,
            footer: 'Shipper',
            role: 'b',
          },
          {
            key: 4,
            header: 'Supplier',
            text: 'Planned Order Variations',
            footer: 'Retailer',
            role: 'b',
            group: 3,
          },
          {
            key: 5,
            header: 'Supplier',
            text: 'Order & Delivery Variations',
            footer: 'Retailer',
            role: 't',
            group: 3,
          },
          {
            key: 13,
            header: 'Supplier',
            isGroup: true,
            footer: 'Shipper',
            role: 'b',
            loop: true,
          },
          {
            key: 14,
            header: 'Supplier',
            text: 'Planned Order Variations',
            footer: 'Retailer',
            role: 'b',
            group: 13,
          },
          {
            key: 15,
            header: 'Supplier',
            text: 'Order & Delivery Variations',
            footer: 'Retailer',
            role: 't',
            group: 13,
          },
        ],
        [
          { from: 1, to: 2 },
          { from: 2, to: 3 },
          { from: 2, to: 13 },
          { from: 4, to: 5 },
          { from: 14, to: 15 },
        ]
      ),
    });

    myDiagram.nodeTemplate = $(
      go.Node,
      'Vertical',
      { defaultStretch: go.GraphObject.Horizontal },
      { fromSpot: go.Spot.RightSide, toSpot: go.Spot.LeftSide },
      $(
        go.Panel,
        'Auto',
        $(
          go.Shape,
          'RoundedTopRectangle',
          { fill: 'white' },
          new go.Binding('fill', 'role', (r) =>
            r[0] === 't' ? 'lightgray' : 'white'
          )
        ),
        $(
          go.TextBlock,
          { margin: new go.Margin(2, 2, 0, 2), textAlign: 'center' },
          new go.Binding('text', 'header')
        )
      ),
      $(
        go.Panel,
        'Auto',
        { minSize: new go.Size(NaN, 70) },
        $(go.Shape, 'Rectangle', { fill: 'white' }),
        $(
          go.TextBlock,
          { width: 120 },
          { margin: new go.Margin(2, 2, 0, 2), textAlign: 'center' },
          new go.Binding('text', 'text')
        )
      )
    );

    myDiagram.groupTemplate = $(
      go.Group,
      'Vertical',
      {
        layout: $(go.TreeLayout, {
          setsPortSpot: false,
          setsChildPortSpot: false,
        }),
      },
      { defaultStretch: go.GraphObject.Horizontal },
      { fromSpot: go.Spot.RightSide, toSpot: go.Spot.LeftSide },
      $(
        go.Panel,
        'Auto',
        $(
          go.Shape,
          'RoundedRectangle',
          { fill: 'white' },
          new go.Binding('fill', 'role', (r) =>
            r[0] === 't' ? 'lightgray' : 'white'
          )
        ),
        $(
          go.TextBlock,
          { margin: new go.Margin(2, 2, 0, 2), textAlign: 'center' },
          new go.Binding('text', 'header')
        )
      ),
      $(
        go.Panel,
        'Auto',
        $(go.Shape, { fill: 'white' }),
        $(go.Placeholder, { padding: 20 })
      )
    );

    myDiagram.linkTemplate = $(
      go.Link,
      { routing: go.Link.Orthogonal, corner: 5 },
      $(go.Shape),
      $(go.Shape, { toArrow: 'Triangle' })
    );

    return myDiagram;
  }

  /**
   * Handle GoJS model changes, which output an object of data changes via Mode.toIncrementalData.
   * This method should iterate over thoe changes and update state to keep in sync with the FoJS model.
   * This can be done with any preferred state management method, as long as immutability is preserved.
   */
  public diagramModelChange = function (changes: go.IncrementalData) {
    console.log(changes);
    // see gojs-angular-basic for an example model changed handler that preserves immutability
    // when setting state, be sure to set skipsDiagramUpdate: true since GoJS already has this update
  };

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}
}
