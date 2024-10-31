document.addEventListener("DOMContentLoaded", function() {
    // Função que cria o componente de navegação
    function TopNavComponent() {
        return `
                    <div class="topnav shadow-sm">
                        <div class="container-fluid">
                            <nav class="navbar navbar-light navbar-expand-lg topnav-menu">
                                <div class="collapse navbar-collapse" id="topnav-menu-content">
                                    <ul class="navbar-nav">
                                        <li class="nav-item dropdown">
                                            <a class="nav-link arrow-none" href="#"
                                               role="button" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">
                                                <i class="uil-dashboard mr-1"></i>Dashboards
                                            </a>
                                        </li>
                                        <li class="nav-item dropdown">
                                            <a class="nav-link dropdown-toggle arrow-none" href="#" id="topnav-layouts"
                                               role="button" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">
                                                <i class="uil-window mr-1"></i>Layouts
                                                <div class="arrow-down"></div>
                                            </a>
                                            <div class="dropdown-menu" aria-labelledby="topnav-layouts">
                                                <a href="layouts-vertical.html" class="dropdown-item">Vertical</a>
                                                <a href="layouts-detached.html" class="dropdown-item">Detached</a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                `;
    }

    // Renderiza o componente de navegação
    function renderTopNav() {
        const app = document.getElementById('app');
        app.innerHTML = TopNavComponent();
    }

    renderTopNav(); // Chama a função de renderização
});