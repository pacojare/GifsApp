import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private API: string = 'XNzO8P9ZhEukZPnDdgWxvsWmvmAi8Afa';
  private _historial: string[] = [];

  private _resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  get resultados(){
    return[...this._resultados];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this._resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
   }

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=XNzO8P9ZhEukZPnDdgWxvsWmvmAi8Afa&q=${query} z&limit=10`)
      .subscribe((resp) => {
        this._resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));

      });

  }

}
