# DevOps Take-Home Assignment: Kubernetes & CI/CD Pipeline

## Project Links

- GitHub Repository: [https://github.com/yourusername/devops-assignment](https://github.com/yourusername/devops-assignment)
- Live Application (via NGINX Ingress): [http://your-ingress-url](http://your-ingress-url)
- Docker Hub Images:
  - Frontend: [https://hub.docker.com/r/abidhurais/helm-manifest-frontend](https://hub.docker.com/r/abidhurais/helm-manifest-frontend)
  - Backend: [https://hub.docker.com/r/abidhurais/helm-manifest-backend](https://hub.docker.com/r/abidhurais/helm-manifest-backend)
- CI/CD Pipeline (GitHub Actions): [https://github.com/yourusername/devops-assignment/actions](https://github.com/yourusername/devops-assignment/actions)

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

