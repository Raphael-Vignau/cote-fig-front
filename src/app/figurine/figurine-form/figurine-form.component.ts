import { Component, Input, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { Figurine } from "../data/Figurine";
import { FigurineService } from "../services/figurine.service";
import { FileValidator } from "ngx-material-file-input";
import { imageFile } from "../../shared/image-file.validator";

@Component({
    selector: 'app-figurine-form',
    templateUrl: './figurine-form.component.html',
    styleUrls: ['./figurine-form.component.css']
})
export class FigurineFormComponent implements OnInit {
    @Input() idFigurine!: string | null;
    classFigurine: string = 'col-md-12';
    authUrl = environment.api_base_url;
    figurineForm: FormGroup;
    figurine!: Figurine;
    readonly maxSize: number = 104857600;
    readonly maxSizePdf: number = 104857600;
    nbrPalette: number = 0;
    nbrPaletteDirty: number = 0;

    nameCtrl: FormControl;
    codeCtrl: FormControl;
    descriptionCtrl: FormControl;
    priceCtrl: FormControl;
    img_figurineCtrl: FormControl;
    pdf_figurineCtrl: FormControl;
    nbr_by_paletteCtrl: FormControl;
    internal_stockCtrl: FormControl;
    internal_stock_dirtyCtrl: FormControl;

    constructor(
        private fb: FormBuilder,
        private figurineService: FigurineService,
        private toastr: ToastrService,
        public route: ActivatedRoute,
        public router: Router
    ) {
        this.nameCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.codeCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.descriptionCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.priceCtrl = fb.control('', [Validators.required]);
        this.img_figurineCtrl = fb.control(null, [FileValidator.maxContentSize(this.maxSize)]);
        this.pdf_figurineCtrl = fb.control(null, [FileValidator.maxContentSize(this.maxSizePdf)]);
        this.nbr_by_paletteCtrl = fb.control('', Validators.required);
        this.internal_stockCtrl = fb.control('', Validators.required);
        this.internal_stock_dirtyCtrl = fb.control('', Validators.required);

        this.figurineForm = fb.group({
            name: this.nameCtrl,
            code: this.codeCtrl,
            description: this.descriptionCtrl,
            price: this.priceCtrl,
            nbr_by_palette: this.nbr_by_paletteCtrl,
            internal_stock: this.internal_stockCtrl,
            internal_stock_dirty: this.internal_stock_dirtyCtrl,
            img_figurine: this.img_figurineCtrl,
            pdf_figurine: this.pdf_figurineCtrl
        }, {
            validator: imageFile('img_figurine')
        } as AbstractControlOptions);
    }

    ngOnInit(): void {
        if (this.idFigurine) {
            this.classFigurine = 'col-md-6';
            this.getFigurine(this.idFigurine)
        }
    }

    getFigurine(idFigurine: string): void {
        this.figurineService.getOneFigurine(idFigurine).subscribe({
            next: (figurine: Figurine) => {
                this.figurine = figurine;
                this.setFormValue();
                this.getPalettes()
            },
            error: () => {
                this.router.navigate(['/not-found']).then()
            }
        })
    }

    setFormValue() {
        this.figurineForm.setValue({
            name: this.figurine.name,
            code: this.figurine.code,
            description: this.figurine.description,
            price: this.figurine.price,
            nbr_by_palette: this.figurine.nbr_by_palette,
            internal_stock: this.figurine.internal_stock,
            internal_stock_dirty: this.figurine.internal_stock_dirty,
            img_figurine: '',
            pdf_figurine: ''
        })
    }

    getFile(fileName: string) {
        this.figurineService.getFigurineFile(fileName).subscribe(
            (data: Blob) => {
                const blob = new Blob([data], {
                    type: 'application/pdf'
                });
                const url = window.URL.createObjectURL(blob);
                window.open(url);
            }
        )
    }

    getPalettes() {
        this.nbrPalette = Math.floor(this.figurine.internal_stock / this.figurine.nbr_by_palette);
        this.nbrPalette = isNaN(this.nbrPalette) ? 0 : this.nbrPalette;

        this.nbrPaletteDirty = Math.floor(this.figurine.internal_stock_dirty / this.figurine.nbr_by_palette);
        this.nbrPaletteDirty = isNaN(this.nbrPaletteDirty) ? 0 : this.nbrPaletteDirty;
    }

    onChangePalettes() {
        this.nbrPalette = Math.floor(this.figurineForm.value.internal_stock / this.figurineForm.value.nbr_by_palette);
        this.nbrPalette = isNaN(this.nbrPalette) ? 0 : this.nbrPalette;

        this.nbrPaletteDirty = Math.floor(this.figurineForm.value.internal_stock_dirty / this.figurineForm.value.nbr_by_palette);
        this.nbrPaletteDirty = isNaN(this.nbrPaletteDirty) ? 0 : this.nbrPaletteDirty;
    }

    onSubmit(): void {
        if (this.figurineForm.value.img_figurine && this.figurineForm.value.img_figurine._files) {
            this.figurineForm.value.img_figurine = this.figurineForm.value.img_figurine._files[0]
            // For delete old img
            if (this.figurine && this.figurine.img_name) {
                this.figurineForm.value.img_name = this.figurine.img_name
            }
        }
        if (this.figurineForm.value.pdf_figurine && this.figurineForm.value.pdf_figurine._files) {
            this.figurineForm.value.pdf_figurine = this.figurineForm.value.pdf_figurine._files[0]
            // For delete old pdf
            if (this.figurine && this.figurine.pdf_name) {
                this.figurineForm.value.pdf_name = this.figurine.pdf_name
            }
        }
        if (this.idFigurine) {
            this.figurineService.editFigurine(this.figurine.id, this.figurineForm.value).subscribe({
                next: () => {
                    this.toastr.success('Le type de bouteille a été modifié', 'Modifier');
                    this.router.navigateByUrl('/figurine').catch(err => console.error(err));
                },
                error: (err) => {
                    this.errorSubmit(err)
                }
            })
        } else {
            this.figurineService.addFigurine(this.figurineForm.value).subscribe({
                next: () => {
                    this.toastr.success('Le type de bouteille a été ajouté', 'Ajouter');
                    this.router.navigateByUrl('/figurine').catch(err => console.error(err));
                },
                error: (err) => {
                    this.errorSubmit(err)
                }
            })
        }
    }

    errorSubmit(error: string[] | string) {
        console.error(error);
        if (Array.isArray(error)) {
            error.map((err: string) => {
                this.toastr.error(err, 'Error !');
            })
        } else {
            this.toastr.error(error, 'Error !');
        }
    }
}
