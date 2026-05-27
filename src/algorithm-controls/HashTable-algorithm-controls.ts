import { Engine, SubmitFunction } from "~/engine";
import { querySelector } from "~/helpers";
import { Collection } from "~/collections";
import { CollectionAlgorithmControl } from "./collection-algorithm-controls";

export class HashTableAlgorithmControl extends CollectionAlgorithmControl {
    HashFunctionSelector: HTMLSelectElement;
    previousValue: string;

    constructor(container: HTMLElement, engine: Collection) {
        super(container, engine);
        this.previousValue = "0";

        this.engine = engine;

        this.algorithmControls.insertAdjacentHTML(
            "beforeend",
            `<span class="formgroup d-inline-flex flex-wrap align-items-center gap-2"><label>
                Hash Function:
                <select id="hashFunction" class="HashFunctionSelector disableWhenRunning">
                <option value="0">Java HashCode</option>
                <option value="1">First Character</option>
                <option value="2">Sum of Characters</option>
                </select>
            </label></span>`
        );

        const insertvalues = document.querySelector<HTMLSelectElement>(".insertSelect");
        if(insertvalues){
            insertvalues.options[2].value = "AA AB AC AD AE AF";
            insertvalues.options[2].text = "AA AB AC AD AE AF";
            insertvalues.options[3].value = "ABC ACB BCA BAC CAB CBA";
            insertvalues.options[3].text = "ABC ACB ... CBA";
        }

        this.HashFunctionSelector = querySelector<HTMLSelectElement>(
            "select.HashFunctionSelector",
            container
        );

        this.HashFunctionSelector.addEventListener("change", () => {
                if(!this.engine.confirmResetAll()){
                    this.HashFunctionSelector.value = this.previousValue;
                }
            }
        );

        this.HashFunctionSelector.addEventListener("focus", () => {
                this.previousValue = this.HashFunctionSelector.value;
            }
        );
    }
}

