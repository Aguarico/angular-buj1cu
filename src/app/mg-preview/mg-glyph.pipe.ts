import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "mgGlyph"
})
export class MgGlyphPipe implements PipeTransform {
  transform(glyph: boolean, index: number, size: number = 100): number {
    const spc = Math.ceil(size * 0.2);
    return glyph ? size * index + spc : size * (index + 1) - spc;
  }
}
