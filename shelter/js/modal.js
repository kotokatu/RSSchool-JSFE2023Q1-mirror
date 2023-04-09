import { createDomNode } from "../index.js";

class Modal {
  constructor() {}

  renderModal = (content) => {
    this.overlay = createDomNode('div', 'overlay');
    this.modal = createDomNode('div', 'modal');
    this.modalCloseBtn = createDomNode('button', 'button-round', 'modal-button');
    this.addModalContent(content);
    this.modal.append(this.modalCloseBtn);
    this.overlay.append(this.modal);
    document.body.append(this.overlay);
    this.modalCloseBtn.addEventListener('click', this.removeModal);
    this.overlay.addEventListener('click', (e) => {
      if (!this.modal.contains(e.target)) this.removeModal();
    });
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

export const modal = new Modal();