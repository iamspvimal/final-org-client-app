import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  myForm : any;
  buttonString:string;
  constructor(public fb:FormBuilder,private ps:ProductsService,  public dialogRef: MatDialogRef<ProductFormComponent>,@Inject(MAT_DIALOG_DATA) public data) {
   console.log(data)
   if(data==null){
    this.myForm=  this.fb.group({
        name:['defaultdemo',[Validators.required,Validators.minLength(4)]],
        description:['Taboule salad Taboule salad Taboule salad Taboule salad',[Validators.required,Validators.minLength(20)]],
        type:['Fruits'],
        qty:['5',[Validators.required]],
        price:['30',[Validators.required]],
        imagename: [null,[Validators.required]]
      });
      this.buttonString = "Add Product"
    }
    else{
      this.myForm=  this.fb.group({
        name:[data.name,[Validators.required,Validators.minLength(4)]],
        description:[data.description,[Validators.required,Validators.minLength(20)]],
        type:[data.type],
        qty:[data.qty,[Validators.required]],
        price:[data.price,[Validators.required]],
        imagename: [null]
      });
      this.buttonString = "Update Product"
    }
  }

  
  uploadFile2(event) {
    if (event.target.files.length > 0)
    {      
      const imgFile: File = event.target.files[0];      
      // console.log(imgFile);
      // console.log(imgFile.name);
      //this.myForm.controls['imagename'].setValue(imgFile ? imgFile : imgFile.name);
      //this.myForm.append('imagename',imgFile,imgFile.name);
      // const file = ($event.target as HTMLInputElement).files[0];
      this.myForm.patchValue({
      imagename: imgFile
      });
      this.myForm.get('imagename').updateValueAndValidity();
    }
  }

  uploadFile1(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.myForm.patchValue({
      imagename: file
    });
    this.myForm.get('imagename').updateValueAndValidity()
  }


  ngOnInit(): void {
  }
  
  addProduct(){
   
    var formData: any = new FormData();
    formData.append("name",this.myForm.get('name').value);
    formData.append("description",this.myForm.get('description').value);
    formData.append("price",this.myForm.get('price').value);
    formData.append("qty",this.myForm.get('qty').value);
    formData.append("type",this.myForm.get('type').value);
    formData.append("imagename",this.myForm.get('imagename').value);
  if(this.data == null)
      this.ps.addProduct(formData).subscribe(
      ()=>{alert("Data Submitted!");this.dialogRef.close()},
      //httpfunction api changes
      (err)=>{alert("Error Storing information...");this.dialogRef.close()}
    )
   else{
     console.log("ENTERED")
     console.log(this.data.id)
     formData.append("id",this.data.id)
   this.ps.updateProduct(formData).subscribe(
    ()=>{alert("Data Submitted");this.dialogRef.close()},
    ()=>{alert("Error Storing information")}
   )
   }
  }
}
