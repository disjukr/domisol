if (typeof module !== 'undefined')
    module.exports = Domisol;

function Domisol(tagName) {
    var dom = document.createElement(tagName || 'div');
    dom.internal = {
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        applyTransform: function () {
            var internal = this.internal;
            this.style.transform = ''.concat(
                'rotate(', internal.rotation, 'deg)',
                'scale(', internal.scaleX, ',', internal.scaleY, ')'
            );
        }.bind(dom)
    };
    Domisol.prototype.__proto__ = dom.__proto__;
    dom.constructor = Domisol;
    dom.__proto__ = Domisol.prototype;
    dom.style.position = 'absolute';
    return dom;
}
Object.defineProperties(Domisol.prototype, {
    x: {
        get: function () {
            return +(window.getComputedStyle(this).left).replace(/[^\d\.]/g, '');
        },
        set: function (value) {
            this.style.left = (+value) + 'px';
        }
    },
    y: {
        get: function () {
            return +(window.getComputedStyle(this).top).replace(/[^\d\.]/g, '');
        },
        set: function (value) {
            this.style.top = (+value) + 'px';
        }
    },
    width: {
        get: function () {
            return +(window.getComputedStyle(this).width).replace(/[^\d\.]/g, '');
        },
        set: function (value) {
            this.style.width = (+value) + 'px';
        }
    },
    height: {
        get: function () {
            return +(window.getComputedStyle(this).height).replace(/[^\d\.]/g, '');
        },
        set: function (value) {
            this.style.height = (+value) + 'px';
        }
    },
    rotation: {
        get: function () {
            return this.internal.rotation;
        },
        set: function (value) {
            this.internal.rotation = value;
            this.internal.applyTransform();
        }
    },
    scaleX: {
        get: function () {
            return this.internal.scaleX;
        },
        set: function (value) {
            this.internal.scaleX = value;
            this.internal.applyTransform();
        }
    },
    scaleY: {
        get: function () {
            return this.internal.scaleY;
        },
        set: function (value) {
            this.internal.scaleY = value;
            this.internal.applyTransform();
        }
    },
    visible: {
        get: function () {
            var style = window.getComputedStyle(this);
            return (style.display !== 'none') && (style.visibility !== 'hidden');
        },
        set: function (value) {
            if (value) {
                this.style.visibility = 'visible';
                this.style.display = 'block';
            } else {
                this.style.display = 'none';
            }
        }
    },
    alpha: {
        get: function () {
            return +window.getComputedStyle(this).opacity;
        },
        set: function (value) {
            this.style.opacity = (+value) + '';
        }
    },
    blendMode: {
        get: function () {
            return window.getComputedStyle(this).mixBlendMode || 'normal';
        },
        set: function (value) {
            this.style.mixBlendMode = value + '';
        }
    },
    buttonMode: {
        get: function () {
            return window.getComputedStyle(this).cursor === 'pointer';
        },
        set: function (value) {
            this.style.cursor = value ? 'pointer' : 'auto';
        }
    },
    root: {
        get: function () {
            var root = this;
            while (root.parentElement !== null) {
                root = root.parentElement
            }
            return root;
        }
    },
    parent: {
        get: function () {
            return this.parentElement;
        }
    },
    addChild: {
        get: function () {
            return this.appendChild;
        }
    }
});
