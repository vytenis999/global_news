import {SafeUrl} from "@angular/platform-browser";

export interface FileHandle{
  file: File,
  url: SafeUrl
}

export interface FilesSent{
  articlesImages: FileHandle[]
}
