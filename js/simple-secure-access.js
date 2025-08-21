/**
 * Simple Client-Side Secure Access (Fallback)
 * For when PHP server is not available
 * Author: Khaled Mahmoud Sulaimani
 */

// Resource URLs with password protection
const SECURE_RESOURCES = {
    'recommendation1': 'https://drive.google.com/file/d/1bd8Ad22Pj899v1aKYmpKLIG8GkLtXsSV/view',
    'recommendation2': 'https://drive.google.com/file/d/recommendation2-file-id/view',
    'recommendation3': 'https://drive.google.com/file/d/recommendation3-file-id/view',
    'resume': 'https://drive.google.com/file/d/1yqBoLS0nIcRLw1qQidM_KgYuUZX3KpEg/view'
};

const SECURE_PASSWORD = 'ksx1559';

// Create and show password modal
function showPasswordModal(resourceKey, resourceName) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'password-modal-overlay';
    modalOverlay.innerHTML = `
        <div class="password-modal">
            <div class="modal-header">
                <div class="modal-icon">
                    <i class="fas fa-lock"></i>
                </div>
                <h3>Secure Access Required</h3>
                <p>Access to <strong>${resourceName}</strong> requires password verification.</p>
            </div>
            
            <div class="modal-body">
                <div class="error-message" id="modalErrorMessage" style="display: none;"></div>
                <div class="success-message" id="modalSuccessMessage" style="display: none;"></div>
                
                <div class="password-input-group">
                    <input 
                        type="password" 
                        id="modalPasswordInput" 
                        placeholder="Enter access password" 
                        class="modal-password-input"
                    >
                </div>
                
                <div class="modal-actions">
                    <button class="modal-btn cancel-btn" onclick="closePasswordModal()">
                        Cancel
                    </button>
                    <button class="modal-btn verify-btn" onclick="verifyPassword('${resourceKey}')">
                        <span class="btn-text">Verify Access</span>
                        <span class="btn-loading" style="display: none;">
                            <i class="fas fa-spinner fa-spin"></i>
                        </span>
                    </button>
                </div>
            </div>
            
            <div class="modal-hint">
                Need access? Contact the portfolio owner for the password.
            </div>
        </div>
    `;
    
    // Add styles
    const modalStyles = `
        .password-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(10px);
            animation: fadeIn 0.3s ease;
        }
        
        .password-modal {
            background: rgba(0, 0, 0, 0.9);
            border: 1px solid rgba(0, 255, 65, 0.3);
            border-radius: 20px;
            padding: 30px;
            max-width: 400px;
            width: 90%;
            animation: slideIn 0.3s ease;
        }
        
        .modal-header {
            text-align: center;
            margin-bottom: 25px;
        }
        
        .modal-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(45deg, #00ff41, #00cc33);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 15px;
            font-size: 1.5rem;
            color: white;
        }
        
        .modal-header h3 {
            color: #fff;
            margin-bottom: 10px;
            font-size: 1.4rem;
        }
        
        .modal-header p {
            color: #ccc;
            font-size: 0.9rem;
        }
        
        .modal-password-input {
            width: 100%;
            padding: 12px 16px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            color: #fff;
            font-size: 1rem;
            margin-bottom: 20px;
            transition: all 0.3s ease;
        }
        
        .modal-password-input:focus {
            outline: none;
            border-color: #00ff41;
            box-shadow: 0 0 15px rgba(0, 255, 65, 0.3);
        }
        
        .modal-actions {
            display: flex;
            gap: 10px;
        }
        
        .modal-btn {
            flex: 1;
            padding: 12px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.9rem;
        }
        
        .cancel-btn {
            background: rgba(255, 255, 255, 0.1);
            color: #ccc;
        }
        
        .cancel-btn:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        .verify-btn {
            background: linear-gradient(45deg, #00ff41, #00cc33);
            color: white;
        }
        
        .verify-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 255, 65, 0.3);
        }
        
        .verify-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
        }
        
        .modal-hint {
            text-align: center;
            color: rgba(255, 255, 255, 0.6);
            font-size: 0.8rem;
            margin-top: 15px;
            font-style: italic;
        }
        
        .error-message {
            background: rgba(255, 0, 0, 0.1);
            border: 1px solid rgba(255, 0, 0, 0.3);
            color: #ff6b6b;
            padding: 10px;
            border-radius: 6px;
            margin-bottom: 15px;
            text-align: center;
            font-size: 0.9rem;
        }
        
        .success-message {
            background: rgba(0, 255, 65, 0.1);
            border: 1px solid rgba(0, 255, 65, 0.3);
            color: #00ff41;
            padding: 10px;
            border-radius: 6px;
            margin-bottom: 15px;
            text-align: center;
            font-size: 0.9rem;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    
    // Add styles to head if not already added
    if (!document.querySelector('#modal-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'modal-styles';
        styleElement.textContent = modalStyles;
        document.head.appendChild(styleElement);
    }
    
    // Add modal to body
    document.body.appendChild(modalOverlay);
    
    // Focus on password input
    setTimeout(() => {
        document.getElementById('modalPasswordInput').focus();
    }, 100);
    
    // Handle Enter key
    document.getElementById('modalPasswordInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            verifyPassword(resourceKey);
        }
    });
    
    // Close modal on overlay click
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closePasswordModal();
        }
    });
}

// Close password modal
function closePasswordModal() {
    const modal = document.querySelector('.password-modal-overlay');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Add fadeOut animation
const additionalStyles = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
if (!document.querySelector('#additional-modal-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'additional-modal-styles';
    styleElement.textContent = additionalStyles;
    document.head.appendChild(styleElement);
}

// Verify password and redirect
function verifyPassword(resourceKey) {
    const passwordInput = document.getElementById('modalPasswordInput');
    const verifyBtn = document.querySelector('.verify-btn');
    const btnText = verifyBtn.querySelector('.btn-text');
    const btnLoading = verifyBtn.querySelector('.btn-loading');
    const errorMsg = document.getElementById('modalErrorMessage');
    const successMsg = document.getElementById('modalSuccessMessage');
    
    const password = passwordInput.value;
    
    // Reset messages
    errorMsg.style.display = 'none';
    successMsg.style.display = 'none';
    
    // Show loading
    verifyBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    
    // Simulate verification delay
    setTimeout(() => {
        if (password === SECURE_PASSWORD) {
            // Success
            successMsg.textContent = 'Access granted! Redirecting...';
            successMsg.style.display = 'block';
            
            // Store access in session for 5 minutes
            sessionStorage.setItem('secureAccess', JSON.stringify({
                verified: true,
                timestamp: Date.now()
            }));
            
            setTimeout(() => {
                window.open(SECURE_RESOURCES[resourceKey], '_blank');
                closePasswordModal();
            }, 1500);
        } else {
            // Error
            errorMsg.textContent = 'Incorrect password. Please try again.';
            errorMsg.style.display = 'block';
            passwordInput.value = '';
            passwordInput.focus();
        }
        
        // Reset button
        verifyBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }, 1000);
}

// Check if user already has valid access
function hasValidAccess() {
    const access = sessionStorage.getItem('secureAccess');
    if (access) {
        const data = JSON.parse(access);
        const now = Date.now();
        const fiveMinutes = 5 * 60 * 1000;
        
        return data.verified && (now - data.timestamp) < fiveMinutes;
    }
    return false;
}

// Handle secure link clicks
function handleSecureAccess(event, resourceKey, resourceName) {
    event.preventDefault();
    
    if (hasValidAccess()) {
        // User already verified, redirect directly
        window.open(SECURE_RESOURCES[resourceKey], '_blank');
    } else {
        // Show password modal
        showPasswordModal(resourceKey, resourceName);
    }
}

// Export functions for global use
window.handleSecureAccess = handleSecureAccess;
window.closePasswordModal = closePasswordModal;
window.verifyPassword = verifyPassword;
