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

    nameCtrl: FormControl;
    descriptionCtrl: FormControl;
    artistCtrl: FormControl;
    gameCtrl: FormControl;
    materialCtrl: FormControl;
    scaleCtrl: FormControl;
    publisherCtrl: FormControl;
    priceCtrl: FormControl;
    yearCtrl: FormControl;
    img_figurineCtrl: FormControl;

    constructor(
        private fb: FormBuilder,
        private figurineService: FigurineService,
        private toastr: ToastrService,
        public route: ActivatedRoute,
        public router: Router
    ) {
        this.nameCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.descriptionCtrl = fb.control('', Validators.maxLength(300));
        this.artistCtrl = fb.control('', Validators.maxLength(60));
        this.gameCtrl = fb.control('', Validators.maxLength(60));
        this.materialCtrl = fb.control('', Validators.maxLength(60));
        this.scaleCtrl = fb.control('', Validators.maxLength(60));
        this.publisherCtrl = fb.control('', Validators.maxLength(60));
        this.priceCtrl = fb.control('', [Validators.maxLength(10)]);
        this.yearCtrl = fb.control('', [Validators.maxLength(4)]);
        this.img_figurineCtrl = fb.control(null, [FileValidator.maxContentSize(this.maxSize)]);

        this.figurineForm = fb.group({
            name: this.nameCtrl,
            description: this.descriptionCtrl,
            publisher: this.publisherCtrl,
            artist: this.artistCtrl,
            game: this.gameCtrl,
            material: this.materialCtrl,
            scale: this.scaleCtrl,
            price: this.priceCtrl,
            year: this.yearCtrl,
            img_figurine: this.img_figurineCtrl
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
            },
            error: () => {
                this.router.navigate(['/not-found']).then()
            }
        })
    }

    setFormValue() {
        this.figurineForm.setValue({
            name: this.figurine.name,
            description: this.figurine.description ? this.figurine.description : '',
            publisher: this.figurine.publisher ? this.figurine.publisher : '',
            artist: this.figurine.artist ? this.figurine.artist : '',
            game: this.figurine?.game ? this.figurine.game : '',
            material: this.figurine?.material ? this.figurine.material : '',
            scale: this.figurine?.scale ? this.figurine.scale : '',
            price: this.figurine.price,
            year: this.figurine.year,
            img_figurine: ''
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

    onSubmit(): void {
        if (this.figurineForm.value.img_figurine && this.figurineForm.value.img_figurine._files) {
            this.figurineForm.value.img_figurine = this.figurineForm.value.img_figurine._files[0]
            // For delete old img
            if (this.figurine && this.figurine.img_name) {
                this.figurineForm.value.img_name = this.figurine.img_name
            }
        }
        if (this.idFigurine) {
            this.figurineService.editFigurine(this.figurine.id, this.figurineForm.value).subscribe({
                next: () => {
                    this.toastr.success('La figurine a été modifié', 'Modifier');
                    this.router.navigateByUrl('/figurine').catch(err => console.error(err));
                },
                error: (err) => {
                    this.errorSubmit(err)
                }
            })
        } else {
            this.figurineService.addFigurine(this.figurineForm.value).subscribe({
                next: () => {
                    this.toastr.success('La figurine a été ajouté', 'Ajouter');
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
