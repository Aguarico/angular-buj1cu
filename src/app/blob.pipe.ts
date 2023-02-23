import { SafeUrl, DomSanitizer } from "@angular/platform-browser";
import { Pipe, OnDestroy, PipeTransform } from "@angular/core";

@Pipe({
  name: "blob"
})
export class BlobPipe implements PipeTransform, OnDestroy {
  private url: string;

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: string): SafeUrl {
    this.url && URL.revokeObjectURL(this.url);

    if (!value) {
      return "";
    }

    this.url = URL.createObjectURL(
      new Blob([value], {
        type: "text/plain"
      })
    );

    return this.sanitizer.bypassSecurityTrustUrl(this.url);
  }

  ngOnDestroy() {
    this.url && URL.revokeObjectURL(this.url);
  }
}
