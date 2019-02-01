import { Component } from '@angular/core';
import { RestService } from './rest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import * as JSZip from 'jszip';
import * as Docxtemplater from 'docxtemplater';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'word';
  public fff: boolean;
  public f: FormGroup;
  public ftype;
  private BASE64_MARKER = ';base64,';

  constructor(
    public rest: RestService,
    public router: Router,
    public _builder: FormBuilder,
  ) {
    this.f = this._builder.group({
      name: ['doc', Validators.required],
      file: null
    });
    this.fff = false
  }

  onFileChange(event) {
    this.fff = true;
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.ftype = file.type;
        this.f.get('file').setValue({
          filename: 'doc',
          filetype: file.type,
          value: (reader.result).toString().split(',')[1]
        });
      };
      //console.log(this.f)
    }
  }

  register() {
    if (this.fff) {
      let uri = this.f.value.file.value;
      let t = this.ftype;
      //*
      this.rest.getGlobal('/word/get', null).subscribe(data => {
        if (!data) {
          this.rest.postGlobal('/word/add', { hash: uri, type: t })
            .subscribe(data => { alert('Guardado') }, err => { console.log(err) })
        } else {
          alert('Carta existente')
        }
      }, err => { console.log(err) })
      //*/
    } else {
      alert('Error')
    }
  }

  update() {
    if (this.fff) {
      let uri = this.f.value.file.value;
      let t = this.ftype;
      //*
      this.rest.putGlobal('/word/update', { hash: uri, type: t })
        .subscribe(data => { alert('Actualizado') }, err => { console.log(err) })
      //*/
    } else {
      alert('Error')
    }
  }

  download() {
    this.rest.getGlobal('/word/get', null).subscribe(data => {
      let mdata: any = data;
      if (!mdata || !mdata.hash || !mdata.type) {
        return alert('Error')
      }
      let b = 'data:' + mdata.type + ';base64,' + mdata.hash
      let base64 = b.substring(b.indexOf(';base64,') + ';base64,'.length)
      let raw = window.atob(base64)
      let array = new Uint8Array(new ArrayBuffer(raw.length))
      for (let i = 0; i < raw.length; i++) {
        array[i] = raw.charCodeAt(i)
      }
      let zip = new JSZip(array)
      let doc = new Docxtemplater()
      doc.loadZip(zip)
      doc.setData({
        first_name: 'John',
        last_name: 'Doe',
        phone: '0652455478',
        description: 'New Website',
        extra_var: 'datos',
      })
      try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render()
      } catch (error) {
        return alert(error)
      }
      let buf = doc.getZip().generate({
        type: "blob",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      })
      //*
      saveAs(buf, 'df.docx')
      //*/
    }, err => {
    })
  }

}
