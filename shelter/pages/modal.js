export class Modal {
  constructor(content) {
    this.overlay;
    this.modal;
    this.content = content;
    this.modalCloseBtn;
  }

  buildModal = () => {
    this.overlay = this.createDomNode(this.overlay, 'div', 'overlay');
    this.modal = this.createDomNode(this.modal, 'div', 'modal');
    this.addModalContent(this.content);
    this.modalCloseBtn = this.createDomNode(this.modalCloseBtn, 'button', 'button-round', 'modal-button');
    this.modal.append(this.modalCloseBtn);
    this.overlay.append(this.modal);
    document.body.append(this.overlay); 
    this.modalCloseBtn.addEventListener('click', this.removeModal)
  }

  createDomNode = (node, element, ...classes) => {
    node = document.createElement(element);
    node.classList.add(...classes);
    return node;
  }

  addModalContent = (content) => {
    this.modal.innerHTML = `<div class="modal-image-container">
    <img class="modal-image" src="${content.imgHi}" alt="${content.type}">
  </div>
  <div class="modal-content">
    <p class="modal-title">${content.name}</p>
    <p class="modal-subtitle">${content.type} - ${content.breed}</p>
    <p class="modal-description">${content.description}</p>
    <ul class="modal-list">
      <li class="modal-item">
        <span class="modal-feature">Age:</span>
        <span class="modal-value">${content.age}</span>
      </li>
      <li class="modal-item">
        <span class="modal-feature">Inoculations:</span>
        <span class="modal-value">${content.inoculations.join(", ")}</span>
      </li>
      <li class="modal-item">
        <span class="modal-feature">Diseases:</span>
        <span class="modal-value">${content.diseases.join(", ")}</span>
      </li>
      <li class="modal-item">
        <span class="modal-feature">Parasites:</span>
        <span class="modal-value">${content.parasites.join(", ")}</span>
      </li>
    </ul>
  </div>`
  }

  removeModal = () => {
    this.overlay.remove();
  }
}