(function()  {

    let scriptQuillCss = document.createElement('link');
    scriptQuillCss.href = '//cdn.quilljs.com/1.3.6/quill.snow.css';
    scriptQuillCss.rel = 'stylesheet';
    document.head.appendChild(scriptQuillCss);

    let scriptQuill = document.createElement('script');
    scriptQuill.src = '//cdn.quilljs.com/1.3.6/quill.min.js';
    document.head.appendChild(scriptQuill);

    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
        <div id="editor">
            <p>Hello World!</p>
            <p>Some initial <strong>bold</strong> text</p>
            <p><br></p>
        </div>
    `;

    scriptQuill.onload = () =>

    customElements.define('com-sap-sample-helloworld1', class HelloWorld1 extends HTMLElement {


		constructor() {
			super(); 
			this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this._firstConnection = false;
		}

        //Fired when the widget is added to the html DOM of the page
        connectedCallback(){
            this._firstConnection = true;
            this.redraw();
        }

         //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
        disconnectedCallback(){
        
        }

         //When the custom widget is updated, the Custom Widget SDK framework executes this function first
		onCustomWidgetBeforeUpdate(oChangedProperties) {
            
		}

        //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
		onCustomWidgetAfterUpdate(oChangedProperties) {
            if (this._firstConnection){
                this.redraw();
            }
        }
        
        //When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy(){
        }

        
        //When the custom widget is resized on the canvas, the Custom Widget SDK framework executes the following JavaScript function call on the custom widget
        // Commented out by default.  If it is enabled, SAP Analytics Cloud will track DOM size changes and call this callback as needed
        //  If you don't need to react to resizes, you can save CPU by leaving it uncommented.
        /*
        onCustomWidgetResize(width, height){
            redraw()
        }
        */

        redraw(){
            var ctx = this._shadowRoot.getElementById("editor");
            console.log(ctx);

            var quill = new Quill(ctx, {
                theme: 'snow'
            });
            console.log(quill);
        }
    });
})();