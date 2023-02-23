import { Component, Input } from "@angular/core";

@Component({
  selector: "mg-preview",
  templateUrl: "./mg-preview.component.svg",
  styleUrls: ["./mg-preview.component.scss"]
})
export class MgPreviewComponent {
  private rows: number;
  private cols: number;
  
  public mg: boolean[][];
  public width = 4000;
  public height = 0;
  public cell: number;

  @Input() set input(input: boolean[][]) {

    // Stores the content
    this.mg = input || [];

    // Extracts the number of rows
    this.rows = this.mg.length || 0;

    // Extracts the mumber of columns
    this.cols = this.rows ? this.mg[0].length : 0;

    // Computes the viewport height
    this.height = this.cols
      ? Math.ceil((this.width * this.rows) / this.cols)
      : 0;

    // Computes the glyph cell size
    this.cell = this.cols ? Math.floor(this.width / this.cols) : 0;
  }
}
