import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {
    AbstractControlOptions,
    UntypedFormArray,
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators
} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {Figurine} from "../data/Figurine";
import {FigurineService} from "../services/figurine.service";
import {imageFile} from "../../shared/image-file.validator";
import {Tag} from "../../tag/data/tag";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatLegacyChipInputEvent as MatChipInputEvent} from "@angular/material/legacy-chips";
import {MatLegacyAutocompleteSelectedEvent as MatAutocompleteSelectedEvent} from "@angular/material/legacy-autocomplete";
import {fromEvent, of} from "rxjs";
import {TagService} from "../../tag/services/tag.service";
import {catchError, debounceTime, distinctUntilChanged, tap} from "rxjs/operators";

@Component({
    selector: 'app-figurine-form',
    templateUrl: './figurine-form.component.html',
    styleUrls: ['./figurine-form.component.css']
})
export class FigurineFormComponent implements OnInit, AfterViewInit {
    @Input() idFigurine!: string | null;
    classFigurine: string = 'col-md-12';
    authUrl = environment.api_base_url;
    figurineForm: UntypedFormGroup;
    figurine!: Figurine;
    readonly maxSize: number = 104857600;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    allTags!: Array<Tag>;

    nameCtrl: UntypedFormControl;
    descriptionCtrl: UntypedFormControl;
    artistCtrl: UntypedFormControl;
    gameCtrl: UntypedFormControl;
    materialCtrl: UntypedFormControl;
    scaleCtrl: UntypedFormControl;
    publisherCtrl: UntypedFormControl;
    priceCtrl: UntypedFormControl;
    yearCtrl: UntypedFormControl;
    img_figurineCtrl: UntypedFormControl;
    tagsCtrl: UntypedFormArray;

    @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

    constructor(
        private fb: UntypedFormBuilder,
        private figurineService: FigurineService,
        private tagService: TagService,
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
        this.priceCtrl = fb.control(0, [Validators.maxLength(10)]);
        this.yearCtrl = fb.control(0, [Validators.maxLength(4)]);
        this.img_figurineCtrl = fb.control(null);
        this.tagsCtrl = fb.array([]);

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
            img_figurine: this.img_figurineCtrl,
            tags: this.tagsCtrl
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

    ngAfterViewInit(): void {
        // server-side search
        fromEvent(this.tagInput.nativeElement, 'keyup').pipe(
            debounceTime(500),
            distinctUntilChanged(),
            tap(() => {
                this.getAllTags();
            })
        ).subscribe();
    }

    get tagsArr() {
        return this.figurineForm.get('tags') as UntypedFormArray;
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
            tags: [],
            img_figurine: ''
        })
        this.setTags()
    }

    setTags() {
        let tagForm: UntypedFormGroup;
        this.figurine.tags.map(
            tag => {
                tagForm = this.fb.group({
                    name: [tag.name, Validators.required],
                    rating: [tag.rating]
                })
                this.tagsCtrl.push(tagForm)
            }
        )
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

    getAllTags() {
        this.tagService.getTags(this.tagInput?.nativeElement.value)
            .pipe(catchError(() => of([]))).subscribe(
            (tags: Tag[]) => this.allTags = tags
        )
    }

    saveImage(idFigurine: string): void {
        if (this.figurineForm.value.img_figurine && this.figurineForm.value.img_figurine._files) {
            this.figurineForm.value.img_figurine = this.figurineForm.value.img_figurine._files[0]
            // For delete old img
            if (this.figurine && this.figurine.img_name) {
                this.figurineForm.value.img_name = this.figurine.img_name
            }
            this.figurineService.editFigurineImage(idFigurine, this.figurineForm.value).subscribe({
                next: () => {
                    this.toastr.success('Image enregistrée', 'Modifier');
                },
                error: (err) => {
                    this.errorSubmit(err)
                }
            })
        }
    }

    onSubmit(): void {
        if (this.idFigurine) {
            this.figurineService.editFigurine(this.figurine.id, this.figurineForm.value).subscribe({
                next: () => {
                    this.saveImage(this.figurine.id)
                    this.toastr.success('La figurine a été modifié', 'Modifier');
                    this.router.navigateByUrl('/figurine').catch(err => console.error(err));
                },
                error: (err) => {
                    this.errorSubmit(err)
                }
            })
        } else {
            this.figurineService.addFigurine(this.figurineForm.value).subscribe({
                next: (figurine) => {
                    this.saveImage(figurine.id)
                    this.toastr.success('La figurine a été ajouté', 'Ajouter');
                    this.router.navigateByUrl('/figurine').catch(err => console.error(err));
                },
                error: (err) => {
                    this.errorSubmit(err)
                }
            })
        }
    }

    onRemoveTag(index: number): void {
        if (index >= 0) {
            this.tagsCtrl.removeAt(index);
            this.tagsCtrl.updateValueAndValidity();
            this.figurineForm.markAsDirty()
        }
    }

    onAddTag(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value.trim();

        if (value.length <= 60 && value.length > 2) {
            const tagForm = this.fb.group({
                name: [value, Validators.required],
                rating: [0]
            });
            this.tagsCtrl.push(tagForm);
            this.tagsCtrl.updateValueAndValidity();
            this.figurineForm.markAsDirty()
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    onSelectedTag(event: MatAutocompleteSelectedEvent): void {
        const tagForm = this.fb.group({
            name: [event.option.value.name, Validators.required],
            rating: [event.option.value.rating]
        });
        this.tagsCtrl.push(tagForm);
        this.tagsCtrl.updateValueAndValidity();
        this.figurineForm.markAsDirty()

        if (this.tagInput) {
            this.tagInput.nativeElement.value = '';
        }
        // this.tagsCtrl.setValue(null);
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
