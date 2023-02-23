import { Component } from "@angular/core";

@Component({
  selector: "body",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  host: { class: "mat-typography" }
})
export class AppComponent {
  public txt: string = ""
  public plt: string = "";
  public width: number = 20;
  public mg: boolean[][];
  public name: string;

  /** Loads the input text file */
  public upload(file: File) {
    // Streams the text content in the text area
    file.text().then(input => {

      this.generate((this.txt = input));

      // Computes the output name
      this.name = file.name.replace(/\..*$/,'.plt');
    });
  }

  public generate(txt: string) {

    this.mg = this.generateMG(txt);

    this.plt = this.convertPLT(this.mg, this.width);
  }

  private generateMG(txt: string): boolean[][] {
    // Get rid of the extra CRs and make sure always ending with an LF
    const input = txt.replace("\r\n", "\n").replace(/(.)\n?$/, "$1\n");
    const output: boolean[][] = [];
    let row: boolean[] = [];

    // Loop on all char
    for (let i = 0; i < input.length; i++) {
      // Convert the char code
      switch (input.charAt(i)) {
        case "0":
          row.push(false);
          break;

        case "1":
          row.push(true);
          break;

        case " ":
          row.push(undefined);
          break;

        case "\n":
          output.push(row);
          row = [];
          break;

        default:
          console.warn("Unexpected char found:", input.charCodeAt(i));
          break;
      }
    }

    return output;
  }

  private convertPLT(mg: boolean[][], width: number = 20): string {

    // Initializes the PLT output
    let output: string = "IN;IP0,0,4000,4000;SC0,0,100,100;\n";

    // Gets the number of columns
    const len = mg?.[0]?.length || 1;

    // Computes the cell size
    const size = Math.round(width / len * 40);
    
    // Computes the single cell margin
    const spc = Math.ceil(size * 0.2);

    // Starts from the code height down to zero
    let y = (mg?.length || 0) * size;

    // Keeps track of the inversion flag for odd lines
    let inv = false;

    // Loops on the code matrix
    for (let line of mg) {

      let x = inv ? line.length * size : 0;

      for (let glyph of line) {

        // Computes the single glyph coordinates
        const x1 = glyph ? (x + spc) : (x + size - spc);
        const y1 = y - spc;
        const x2 = glyph ? (x + size - spc) : (x + spc);
        const y2 = y - size + spc;

        // Outputs the glyph
        output = inv 
          ? output.concat(`PU;PA${x2},${y2};PD;PA${x1},${y1};`)
          : output.concat(`PU;PA${x1},${y1};PD;PA${x2},${y2};`);

        x += inv ? -size : size;
      }

      output = output.concat('\n');

      inv != inv;
      y -= size;
    }

    return output;
  }
}
