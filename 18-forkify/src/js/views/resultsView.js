import View from './View.js';
import PreviewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');

  _errorMessage = 'No recipes found, please, try again!';
  _message = '';

  _generateMarkup() {
    return this._data
      .map(preview => PreviewView.render(preview, false))
      .join('');
  }
}

/* 
 <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
*/

export default new ResultsView();
