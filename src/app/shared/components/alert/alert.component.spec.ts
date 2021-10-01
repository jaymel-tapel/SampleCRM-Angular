import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { AlertComponent } from "./alert.component";

describe('Alert component', () => {
    let fixture:ComponentFixture<AlertComponent>;
    let component:any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AlertComponent],
          });
        fixture = TestBed.createComponent(AlertComponent); 
        component = fixture.debugElement.componentInstance;
    })

    it('Should have class based on alertClass input', () => {
        let sampleClass = 'danger';
        component.alertClass = sampleClass;
        fixture.detectChanges();
        expect(Object.keys(fixture.debugElement.query(By.css("div")).classes)).toContain(sampleClass);
    });
});


