(function()  {

    let css = document.createElement('link');
    css.href = '//cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css';
    css.rel = 'stylesheet';
    document.head.appendChild(css);

    let script = document.createElement('script');
    script.src = '//cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js';
    document.head.appendChild(script);

    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
        <div id="editor"></div>
    `;

    script.onload = () =>

    customElements.define('com-sap-sample-helloworld1', class HelloWorld1 extends HTMLElement {


		constructor() {
			super(); 
            this.appendChild(tmpl.content.cloneNode(true));
            this._firstConnection = false;
		}

        //Fired when the widget is added to the html DOM of the page
        connectedCallback(){
            this._firstConnection = true;
            this.redraw();
        }

         //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
        disconnectedCallback(){
            try{
                document.head.removeChild(script);
                document.head.removeChild(css);
            }
            catch{}
        }

         //When the custom widget is updated, the Custom Widget SDK framework executes this function first
		onCustomWidgetBeforeUpdate(oChangedProperties) {
            
		}

        //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
		onCustomWidgetAfterUpdate(oChangedProperties) {
            console.log("After update:" + this._widgetText);

            if (this._firstConnection){
                this.redraw();
            }
        }
        
        //When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy(){
            try{
                document.head.removeChild(script);
                document.head.removeChild(css);
            }
            catch{}
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
            $('#editor').summernote({
                placeholder: 'Type here your comment',
                tabsize: 2,
                height: 120,
                toolbar: [
                  ['style', ['style']],
                  ['font', ['bold', 'underline', 'clear']],
                  ['color', ['color']],
                  ['para', ['ul', 'ol', 'paragraph']],
                  ['table', ['table']],
                  ['insert', ['link', 'picture', 'video']],
                  ['view', ['fullscreen', 'codeview', 'help']]
                ]
              });
        }

        get widgetText() {
            console.log("Getter: " + this._widgetText);
            console.log("Getter: " + $('#editor').summernote ('code', '<b> hello world </ b>'));

            return $('#editor').summernote ('code');
        }
        
        set widgetText(value) {
            this._widgetText = value;
            $('#editor').summernote ('code', this._widgetText);

            console.log("Setter: " + this._widgetText);
        }
    });
})();