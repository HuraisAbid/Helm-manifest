# Kubernetes & CI/CD Pipeline

## Project Links

- GitHub Repository: [https://github.com/HuraisAbid/Helm-manifest.git](https://github.com/HuraisAbid/Helm-manifest.git)
- Live Application (via NGINX Ingress): (http://192.168.188.129:31923/)
- Docker Hub Images:
  - Frontend: [https://hub.docker.com/r/abidhurais/helm-manifest-frontend](https://hub.docker.com/r/abidhurais/helm-manifest-frontend)
  - Backend: [https://hub.docker.com/r/abidhurais/helm-manifest-backend](https://hub.docker.com/r/abidhurais/helm-manifest-backend)
- SonarQube On-Prem URL: [http://192.168.188.128:9000/projects](http://192.168.188.128:9000/projects)

---


## Overview

This project demonstrates a complete **end-to-end DevOps workflow**, including:

- Kubernetes cluster setup using `kubeadm`
- Application containerization with Docker
- Pushing images to Docker Hub with semantic versioning
- Kubernetes deployments using Helm
- NGINX Ingress for routing
- CI/CD automation using GitHub Actions (microservices with change detection)
- Security best practices:
  - Non-root containers
  - Secrets handling
  - Resource limits
  - Vulnerability scanning with Trivy and code quality checks with SonarQube

### Application Components

- **Frontend**: NGINX static web UI  
- **Backend API**: Node.js + Redis integration  
- **Redis**: Secured with password, accessible only by backend  

---

## Installation Phases

### Phase 1 — Kubernetes Cluster Setup (kubeadm)

**Environment Details:**

- Hypervisor: VMware  
- OS: Ubuntu 24.04 LTS  
- Kubernetes version: v1.28.x  
- Container Runtime: containerd  
- CNI: Calico  
- Network: NAT  

**Steps Overview:**

1. **Create Virtual Machines** (2 VMs: Master & Worker, 2 vCPU, 4GB RAM, 40GB disk)  
2. **Verify Network Connectivity**: ping between nodes  
3. **Disable Swap** (mandatory for kubeadm)  
4. **Enable Kernel Modules & Networking** (`overlay`, `br_netfilter`)  
5. **Install containerd** (set `SystemdCgroup = true`)  
6. **Install Kubernetes Components** (`kubelet`, `kubeadm`, `kubectl`)  
7. **Initialize Master Node** with `kubeadm init`  
8. **Configure kubectl** for cluster access  
9. **Install CNI Plugin (Calico)**  
10. **Join Worker Node** to cluster using `kubeadm join`  
11. **Verify Cluster**: `kubectl get nodes -o wide`  

---

### Phase 2 — Repository Structure
project/
├─ frontend/
├─ backend/
├─ k8s/
├─ helm/
├─ .github/workflows/
├─ docs/
└─ README.md

---

### Phase 3 — Dockerfile Creation & Docker Hub Setup

- **Frontend**: NGINX, non-root user, healthchecks, small image  
- **Backend**: Node.js, non-root, Redis integration, healthchecks  
- **Redis**: Alpine-based, password-protected  
- Push images to Docker Hub with semantic versioning (`x.0`)  

---

### Phase 4 — SonarQube Setup (On-Prem)

- SonarQube runs on VM  
- Code quality scanned before building Docker image  
- Secrets stored securely via GitHub Secrets  

---

### Phase 5 — GitHub Actions & CI/CD Pipeline

#### Pipeline Overview

- **Change Detection**: Only services that changed are built/tested  
- **SonarQube Scan**: Quality checks using secrets from GitHub  
- **Docker Build**: Semantic versioning and `latest` tag  
- **Trivy Scan**: Detect vulnerabilities before pushing  
- **Push to Docker Hub**  
- **Deploy to Kubernetes via Helm**  
- **Access via Ingress**  

#### Workflow Example

1. **Change Detection**:  
   Detect whether frontend or backend code changed using `git diff`  

2. **Docker Build & SonarQube**:  
   Build Docker image and scan code with SonarQube for quality gates  

3. **Trivy Scan**:  
   Scan images for vulnerabilities  

4. **Push to Docker Hub**:  
   Push image tags (`semantic version` and `latest`)  

5. **Deployment**:  
   Deploy updated service to Kubernetes using Helm  

---

## Future Goals

- Migrate pipeline to **Azure DevOps**  
- Use **Azure Container Registry (ACR)** for image storage  
- Deploy Kubernetes workloads on **AKS**  

---

## License

This project is for **educational purposes**.  

---


