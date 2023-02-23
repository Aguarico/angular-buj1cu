import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MgPreviewComponent } from "./mg-preview.component";
import { MgGlyphPipe } from './mg-glyph.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [MgPreviewComponent, MgGlyphPipe],
  exports: [MgPreviewComponent]
})
export class MgPreviewModule {}
