class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
            #backdrop {
                position: fixed;
                top:0;
                left:0;
                width:100%;
                height:100vh;
                background:rgba(0,0,0,0.75);
                z-index:10;
                opacity:0;
                pointer-events:none;
            }

            :host([opened]) #backdrop, 
            :host([opened]) #modal {
                opacity:1;
                pointer-events:all;
            }

            #modal {
                position:fixed;
                top:15vh;
                left:25%;
                width:50%;
                z-index:100;
                background:white;
                border-radius:5px;
                box-shadow:0 2px 8px rgba(0,0,0,0.26)
                display:flex;
                flex-direction:column;
                justify-content:space-between;
                opacity:0;
                pointer-events:none;
            }

            header{
                padding:1rem;
            }

            ::slotted(h1){
                font-size:1.25rem;
             }

             #main {
                padding:1rem;
             }

            #actions{
                border-top:1px solid grey;
                padding:1rem;
                display:flex;
                justify-content:flex-end;
            }

             #actions button {
                margin: 0 0.25rem;
             }
        </style>
        <div id='backdrop'></div>
        <div id='modal'>
            <header>
                <slot name='title'>Please Confirm Payment</slot>
            </header>
            <section id='main'>
                <slot></slot>
            </section>
            <section id='actions'>
                <button id='cancel-btn'>Cancel</button>
                <button id='confirm-btn'>Confirm</button>
            </section>
        </div>
    `;
    const slots = this.shadowRoot.querySelectorAll("slot");
    slots[1].addEventListener("slotchange", (event) => {
      console.dir(slots[1].assignedNodes());
    });

    const cancelBtn = this.shadowRoot.querySelector("#cancel-btn");
    const confirmBtn = this.shadowRoot.querySelector("#confirm-btn");
    cancelBtn.addEventListener("click", this._cancel.bind(this));
    confirmBtn.addEventListener("click", this._confirm.bind(this));
  }

  //   attributeChangedCallback(name, oldValue, newValue) {

  //   }

  static get observedAttributes() {
    return ["opened"];
  }

  open() {
    this.setAttribute("opened", "");
  }

  hide() {
    if (this.hasAttribute) {
      this.removeAttribute("opened");
    }
  }

  _cancel() {
    this.hide(); 
  }

  _confirm() {
    this.hide(); 
  }
}

customElements.define("uc-modal", Modal);
